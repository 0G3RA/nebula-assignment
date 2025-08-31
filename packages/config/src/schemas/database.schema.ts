import { z } from 'zod';

export const makeDbSchema = (prefix: string) =>
  z.object({
    [`${prefix}_DB_HOST`]: z.string(),
    [`${prefix}_DB_PORT`]: z.coerce.number(),
    [`${prefix}_DB_USER`]: z.string(),
    [`${prefix}_DB_PASSWORD`]: z.string(),
    [`${prefix}_DB_NAME`]: z.string(),
  });
