import { Injectable, Logger } from '@nestjs/common';
import { type SendPushJob } from '@app/contracts';
import { httpPost } from 'src/common/http.util';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);

  constructor(private readonly notificationService: NotificationService) {}

  async processPushNotification(jobData: SendPushJob): Promise<void> {
    const { userId, name, scheduledAt, traceId, correlationId } = jobData;

    this.logger.log(`Processing push notification for user ${userId}`, {
      name,
      scheduledAt,
      traceId,
      correlationId,
    });

    await this.notificationService.upsertNotification({
      userId,
      correlationId,
      traceId,
      scheduledAt,
    });

    try {
      await this.sendPushNotification(jobData);

      await this.notificationService.markNotificationAsSent(correlationId);
      this.logger.log(`Push notification sent successfully to user ${userId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown';

      this.logger.error(`Failed to send push notification to user ${userId}`, {
        error: errorMessage,
        traceId,
        correlationId,
      });

      await this.notificationService.markNotificationAsFailed(
        correlationId,
        errorMessage,
      );

      throw error;
    }
  }

  private async sendPushNotification(data: SendPushJob): Promise<void> {
    const { userId, name, scheduledAt, traceId, correlationId } = data;

    if (!process.env.WEBHOOK_URL) {
      throw new Error('WEBHOOK_URL environment variable is not configured');
    }

    const payload = {
      type: 'push' as const,
      userId,
      name,
      scheduledAt,
      sentAt: new Date().toISOString(),
      traceId,
      correlationId,
    };

    const headers = {
      'X-Trace-Id': traceId,
      'X-Correlation-Id': correlationId,
      'Content-Type': 'application/json',
    };

    await httpPost(process.env.WEBHOOK_URL, payload, { headers });

    this.logger.debug(`Push notification sent to user ${userId} (${name})`, {
      traceId,
      correlationId,
    });
  }
}
