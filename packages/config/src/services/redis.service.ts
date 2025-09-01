import { ensureShared } from '../validators/shared.validator';

export const redisConfig = {
  getConnection() {
    const e = ensureShared();
    return {
      host: e.REDIS_HOST,
      port: e.REDIS_PORT,
      db: e.REDIS_DB,
      password: e.REDIS_PASSWORD,
      // disabling maxRetriesPerRequest
      maxRetriesPerRequest: null as unknown as number,
    };
  },
};
