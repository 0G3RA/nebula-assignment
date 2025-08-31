import { z } from 'zod';

/** Shared (infrastructure) schema */
export const sharedSchema = z.object({
  NODE_ENV: z.string().default('development'),

  // Redis / BullMQ
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_DB: z.coerce.number().default(0),

  // RabbitMQ
  RMQ_URL: z.string().regex(/^(amqp|amqps):\/\//, 'Must be amqp URL'),
  RMQ_EXCHANGE: z.string().default('app.events'),
  RMQ_PREFETCH: z.coerce.number().default(20),

  // Notifications
  WEBHOOK_URL: z.string().url(),
  PUSH_DELAY_HOURS: z.coerce.number().default(24),
});

export type Shared = z.infer<typeof sharedSchema>;
