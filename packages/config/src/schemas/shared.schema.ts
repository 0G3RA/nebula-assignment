import { z } from 'zod';

export const sharedSchema = z.object({
  NODE_ENV: z.string().default('development'),

  // NOTIFICATIONS
  WEBHOOK_URL: z.string().url(),
  PUSH_DELAY_HOURS: z.coerce.number().default(24),

  // REDIS
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_DB: z.coerce.number().default(0),
  REDIS_PASSWORD: z.string().default(''),

  // RABBITMQ (URL або компоненти)
  RABBITMQ_URL: z.string().url().optional(),
  RABBITMQ_HOST: z.string().default('localhost'),
  RABBITMQ_PORT: z.coerce.number().default(5672),
  RABBITMQ_USER: z.string(),
  RABBITMQ_PASS: z.string(),
  RABBITMQ_VHOST: z.string().default('/'),
  RABBITMQ_EXCHANGE: z.string().default('app.events'),
  RABBITMQ_PREFETCH: z.coerce.number().default(20),

  // DB (shared creds)
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  // Users DB
  USERS_DB_HOST: z.string(),
  USERS_DB_PORT: z.coerce.number(),
  USERS_DB_NAME: z.string(),

  // Notifications DB
  NOTIFS_DB_HOST: z.string(),
  NOTIFS_DB_PORT: z.coerce.number(),
  NOTIFS_DB_NAME: z.string(),
});

export type Shared = z.infer<typeof sharedSchema>;
