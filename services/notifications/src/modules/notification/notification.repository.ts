import { Injectable } from '@nestjs/common';
import { DatabaseService as DbService } from '../database';
import { NotificationStatus } from 'node_modules/.prisma/client';
import { toDate } from 'src/common/date.util';
import { UpsertNotificationInput } from './notification.interface';

@Injectable()
export class NotificationRepository {
  constructor(private readonly db: DbService) {}

  async upsert(data: UpsertNotificationInput): Promise<void> {
    await this.db.notification.upsert({
      where: { correlationId: data.correlationId },
      create: {
        userId: data.userId,
        correlationId: data.correlationId,
        traceId: data.traceId,
        scheduledAt: toDate(data.scheduledAt),
        status: NotificationStatus.SCHEDULED,
      },
      update: {
        userId: data.userId,
        traceId: data.traceId,
        scheduledAt: toDate(data.scheduledAt),
      },
    });
  }

  async markSent(correlationId: string): Promise<void> {
    await this.updateStatus(correlationId, NotificationStatus.SENT, {
      sentAt: new Date(),
    });
  }

  async markFailed(correlationId: string, errorMessage: string): Promise<void> {
    const reason = errorMessage?.slice(0, 1_000) ?? 'unknown';

    await this.updateStatus(correlationId, NotificationStatus.FAILED, {
      failReason: reason,
      retryCount: { increment: 1 },
    });
  }

  private async updateStatus(
    correlationId: string,
    status: NotificationStatus,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    await this.db.notification.update({
      where: { correlationId },
      data: { status, ...extra },
    });
  }
}
