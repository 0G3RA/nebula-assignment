import {
  DynamicModule,
  Global,
  Module,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import IORedis from 'ioredis';
import { Queue } from 'bullmq';
import { DI_TOKENS, QUEUE_TOKENS, type SendPushJob } from '@app/contracts';
import { pushQueueProvider } from './providers/push-queue.provider';
import { QueueModuleOptions } from './queue.interface';
import { redisProvider } from './providers/redis.provider';

@Global()
@Module({})
export class QueueModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueModule.name);

  constructor(
    @Inject(DI_TOKENS.REDIS) private readonly redis: IORedis,
    @Inject(QUEUE_TOKENS.PUSH) private readonly pushQueue: Queue<SendPushJob>,
  ) {}

  static forRoot(opts?: QueueModuleOptions): DynamicModule {
    return {
      module: QueueModule,
      providers: [redisProvider(opts), pushQueueProvider(opts)],
      exports: [DI_TOKENS.REDIS, QUEUE_TOKENS.PUSH],
      global: true,
    };
  }

  async onModuleInit() {
    try {
      const status = (this.redis as unknown as { status?: string })?.status;
      if (status === 'wait') {
        await this.redis.connect();
      }
    } catch (err) {
      this.logger.warn('[init] Redis connect skipped', err as Error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.pushQueue.close();
    } catch (err) {
      this.logger.warn('[shutdown] Failed closing queue', err as Error);
    }
    try {
      await this.redis.quit();
    } catch (err) {
      this.logger.warn(
        '[shutdown] Redis quit failed, fallback disconnect',
        err as Error,
      );
      this.redis.disconnect();
    }
  }
}
