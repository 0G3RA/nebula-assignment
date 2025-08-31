import { Injectable, Logger } from '@nestjs/common';
import { type SendPushJob } from '@app/contracts';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);

  async processPushNotification(jobData: SendPushJob): Promise<void> {
    const { userId, username, scheduledAt, traceId, correlationId } = jobData;

    this.logger.log(`Processing push notification for user ${userId}`, {
      username,
      scheduledAt,
      traceId,
      correlationId,
    });

    try {
      await this.sendPushNotification(jobData);
      this.logger.log(`Push notification sent successfully to user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to send push notification to user ${userId}`,
        error,
      );
      throw error;
    }
  }

  private async sendPushNotification(data: SendPushJob): Promise<void> {
    // TODO: add mock service with hook
    // TODO2: add notification model for saving data

    //! Temp solution
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.logger.debug(
      `Push notification sent to user ${data.userId} (${data.username})`,
    );
  }
}
