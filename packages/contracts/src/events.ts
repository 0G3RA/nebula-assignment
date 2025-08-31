export const TOPICS = {
  USER_CREATED_V1: 'user.created.v1',
} as const;

export type Topic = (typeof TOPICS)[keyof typeof TOPICS];

export interface UserCreatedV1 {
  userId: string;
  name: string;
  createdAt: string;
  traceId: string;
  correlationId: string;
}
