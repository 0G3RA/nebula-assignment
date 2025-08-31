import { makeDbSchema } from '../schemas/database.schema';

export const ensureDb = (prefix: string) => {
  const res = makeDbSchema(prefix).safeParse(process.env);
  if (!res.success) {
    const msg = res.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    throw new Error(`Invalid ${prefix} DB ENV: ${msg}`);
  }
  return res.data;
};
