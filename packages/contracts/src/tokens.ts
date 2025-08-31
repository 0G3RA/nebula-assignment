export const DI_TOKENS = {
  REDIS: Symbol('REDIS_CONNECTION'),
} as const;

export const QUEUE_TOKENS = {
  PUSH: Symbol('PUSH_QUEUE'),
} as const;

export const WORKER_TOKENS = {
  PUSH: Symbol('PUSH_WORKER'),
} as const;

export const JOBS = {
  SEND_PUSH: 'send-push',
} as const;

export const QUEUES = {
  SEND_PUSH: 'send.push',
} as const;

export const RMQ_QUEUES = {
  SCHEDULER: 'scheduler.q',
} as const;

export const TOPICS = {
  USER_CREATED_V1: 'user.created.v1',
  NOTIFICATION_FAILED_V1: 'notification.failed.v1',
} as const;
