import type { JobsOptions, WorkerOptions } from 'bullmq';
import { cfg } from '@app/config';

export const DEFAULT_WORKER_CONFIG = {
  concurrency: 5,
  autorun: true,
} as const;

export const DEFAULT_REDIS_OPTIONS = () => ({
  ...cfg.redisConn(),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: (attempt: number) => Math.min(1000 * attempt, 10_000),
});
