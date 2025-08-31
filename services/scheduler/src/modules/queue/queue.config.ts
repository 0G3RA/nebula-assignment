import type { JobsOptions, QueueOptions } from 'bullmq';
import { cfg } from '@app/config';

export const DEFAULT_QUEUE_OPTIONS: Omit<QueueOptions, 'connection'> = {};

export const DEFAULT_JOB_OPTIONS: JobsOptions = {
  removeOnComplete: 1000,
  removeOnFail: false,
  attempts: 5,
  backoff: { type: 'exponential', delay: 1000 },
};

export const DEFAULT_REDIS_OPTIONS = () => ({
  ...cfg.redisConn(),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: (attempt: number) => Math.min(1000 * attempt, 10_000),
});
