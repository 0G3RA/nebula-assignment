import { FactoryProvider } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import {
  QUEUE_TOKENS,
  QUEUES,
  DI_TOKENS,
  type SendPushJob,
} from '@app/contracts';
import { DEFAULT_JOB_OPTIONS, DEFAULT_QUEUE_OPTIONS } from '../queue.config';
import type { QueueModuleOptions } from '../queue.interface';

export const pushQueueProvider = (
  opts?: QueueModuleOptions,
): FactoryProvider => ({
  provide: QUEUE_TOKENS.PUSH,
  inject: [DI_TOKENS.REDIS],
  useFactory: (redis: IORedis) =>
    new Queue<SendPushJob>(QUEUES.SEND_PUSH, {
      connection: redis,
      ...DEFAULT_QUEUE_OPTIONS,
      ...(opts?.queueOptions ?? {}),
      defaultJobOptions: {
        ...DEFAULT_JOB_OPTIONS,
        ...(opts?.defaultJobOptions ?? {}),
      },
    }),
});
