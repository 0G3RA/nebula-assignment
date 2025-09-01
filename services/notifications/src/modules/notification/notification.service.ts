import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { UpsertNotificationInput as NotificationDTO } from 'src/modules/notification/notification.interface';

@Injectable()
export class NotificationService {
  constructor(private readonly notifRepo: NotificationRepository) {}

  async upsertNotification(data: NotificationDTO) {
    await this.notifRepo.upsert(data);
  }

  async markNotificationAsSent(correlationId: string): Promise<void> {
    await this.notifRepo.markSent(correlationId);
  }

  async markNotificationAsFailed(
    correlationId: string,
    errorMessage: string,
  ): Promise<void> {
    await this.notifRepo.markFailed(correlationId, errorMessage);
  }
}
