export interface UpsertNotificationInput {
  userId: string;
  correlationId: string;
  traceId: string;
  scheduledAt: Date | string;
}
