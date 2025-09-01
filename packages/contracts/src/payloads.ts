export interface UserCreatedV1 {
  userId: string;
  name: string;
  createdAt: string; // ISO
  traceId: string;
  correlationId: string;
}

export type SendPushJob = {
  userId: string;
  name: string;
  scheduledAt: string; // ISO
  traceId: string;
  correlationId: string;
};
