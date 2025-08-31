import { Injectable, OnModuleInit } from '@nestjs/common';
import { RmqService, type Message } from '@app/rmq';
import { TOPICS, type UserCreatedV1 } from '@app/contracts';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(private readonly rmq: RmqService) {}

  async onModuleInit(): Promise<void> {
    console.log('[scheduler] subscribing...');
    await this.rmq.subscribe(
      { queue: 'scheduler.q', bindingKeys: [TOPICS.USER_CREATED_V1] },
      (msg: Message<UserCreatedV1>) => this.onUserCreated(msg),
    );
  }

  private onUserCreated({ routingKey, data }: Message<UserCreatedV1>) {
    console.log('[scheduler] received', routingKey, data);
    // TODO: here i'll add the queue for fake notify
  }
}
