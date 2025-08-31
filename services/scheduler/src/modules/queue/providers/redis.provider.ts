import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
import { DI_TOKENS } from '@app/contracts';
import { DEFAULT_REDIS_OPTIONS } from '../queue.config';
import type { QueueModuleOptions } from '../queue.interface';

export const redisProvider = (opts?: QueueModuleOptions): FactoryProvider => ({
  provide: DI_TOKENS.REDIS,
  useFactory: async () => {
    if (opts?.createRedis) return await opts.createRedis();
    return new IORedis(DEFAULT_REDIS_OPTIONS());
  },
});
