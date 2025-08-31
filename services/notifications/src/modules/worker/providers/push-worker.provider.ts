import { FactoryProvider } from '@nestjs/common';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import {
  WORKER_TOKENS,
  QUEUES,
  DI_TOKENS,
  type SendPushJob,
} from '@app/contracts';
import { PushNotificationService } from '../../push/push-notification.service';
import { DEFAULT_WORKER_CONFIG } from '../worker.config';

export const pushWorkerProvider: FactoryProvider = {
  provide: WORKER_TOKENS.PUSH,
  inject: [DI_TOKENS.REDIS, PushNotificationService],
  useFactory: (redis: IORedis, pushService: PushNotificationService) => {
    return new Worker<SendPushJob>(
      QUEUES.SEND_PUSH,
      async (job) => {
        await pushService.processPushNotification(job.data);
      },
      {
        connection: redis,
        ...DEFAULT_WORKER_CONFIG,
      },
    );
  },
};
