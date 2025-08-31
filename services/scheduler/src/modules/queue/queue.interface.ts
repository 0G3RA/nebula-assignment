import type { QueueOptions, JobsOptions } from 'bullmq';
import type IORedis from 'ioredis';

export interface RedisFactoryOptions {
  createRedis?: () => IORedis | Promise<IORedis>;
}

export interface PushQueueFactoryOptions {
  queueOptions?: Omit<QueueOptions, 'connection'>;
  defaultJobOptions?: JobsOptions;
}

export interface QueueModuleOptions
  extends RedisFactoryOptions,
    PushQueueFactoryOptions {}
