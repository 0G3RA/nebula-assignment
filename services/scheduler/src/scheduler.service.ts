import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RmqService, type Message } from '@app/rmq';
import {
  JOBS,
  QUEUE_TOKENS,
  RMQ_QUEUES,
  TOPICS,
  type UserCreatedV1,
} from '@app/contracts';
import { Queue } from 'bullmq';
import { cfg } from '@app/config';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);
  private unsubscribe?: () => Promise<void>;
  private readonly delayMs = cfg.pushDelayMs();

  constructor(
    private readonly rmq: RmqService,
    @Inject(QUEUE_TOKENS.PUSH) private readonly pushQueue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log(
      `[init] subscribe RMQ queue="${RMQ_QUEUES.SCHEDULER}" keys=[${TOPICS.USER_CREATED_V1}]`,
    );

    try {
      this.unsubscribe = await this.rmq.subscribe(
        { queue: RMQ_QUEUES.SCHEDULER, bindingKeys: [TOPICS.USER_CREATED_V1] },
        (msg: Message<UserCreatedV1>) => this.onUserCreated(msg),
      );
      this.logger.log('[init] Successfully subscribed to RMQ');
    } catch (error) {
      this.logger.error('[init] Failed to subscribe to RMQ', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.unsubscribe) {
      try {
        await this.unsubscribe();
        this.logger.log('[shutdown] Successfully unsubscribed from RMQ');
      } catch (error) {
        this.logger.error('[shutdown] Error during unsubscribe', error);
      }
    }
  }

  private async onUserCreated({ data }: Message<UserCreatedV1>) {
    const scheduledAt = new Date(Date.now() + this.delayMs).toISOString();

    await this.pushQueue.add(
      JOBS.SEND_PUSH,
      {
        userId: data.userId,
        username: data.name,
        scheduledAt,
        traceId: data.traceId,
        correlationId: data.correlationId,
      },
      {
        delay: this.delayMs,
        jobId: data.correlationId,
      },
    );

    this.logger.log(
      `[scheduled] userId=${data.userId} corr=${data.correlationId} at=${scheduledAt}`,
    );
  }
}
