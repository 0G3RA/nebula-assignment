import { ensureShared } from './validators/shared.validator';
import { redisConfig } from './services/redis.service';
import { rabbitmqConfig } from './services/rabbitmq.service';
import { databaseConfig } from './services/database.service';
import { notificationsConfig } from './services/notifications.service';

export const cfg = {
  shared() {
    return ensureShared();
  },
  redisConn() {
    return redisConfig.getConnection();
  },
  rmq() {
    return rabbitmqConfig.getConfig();
  },
  pushDelayMs() {
    return notificationsConfig.getPushDelayMs();
  },
  dbUrl(prefix: string): string {
    return databaseConfig.getUrl(prefix);
  },
};
