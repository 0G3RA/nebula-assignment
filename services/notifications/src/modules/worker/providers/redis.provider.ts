import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
import { DI_TOKENS } from '@app/contracts';
import { DEFAULT_REDIS_OPTIONS } from '../worker.config';

export const redisProvider: FactoryProvider = {
  provide: DI_TOKENS.REDIS,
  useFactory: () => new IORedis(DEFAULT_REDIS_OPTIONS()),
};
