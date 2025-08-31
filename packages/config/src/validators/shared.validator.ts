import { sharedSchema, type Shared } from '../schemas/shared.schema';

let sharedParsed: Shared | null = null;

export const ensureShared = (): Shared => {
  if (!sharedParsed) {
    const res = sharedSchema.safeParse(process.env);
    if (!res.success) {
      const msg = res.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      throw new Error(`Invalid SHARED ENV: ${msg}`);
    }
    sharedParsed = res.data;
  }
  return sharedParsed;
};
