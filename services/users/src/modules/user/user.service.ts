import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TOPICS, UserCreatedV1 } from '@app/contracts';
import { RmqService } from '@app/rmq';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly rmq: RmqService,
  ) {}

  async create(name: string) {
    const user = await this.userRepo.create(name);

    const payload: UserCreatedV1 = {
      userId: user.id,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      traceId: crypto.randomUUID(),
      correlationId: user.id,
    };

    await this.rmq.publish(TOPICS.USER_CREATED_V1, payload);
    console.log('Sended Payload');

    return user;
  }
}
