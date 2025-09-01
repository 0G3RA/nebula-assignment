import { ensureDb } from '../validators/database.validator';

export const databaseConfig = {
  getUrl(prefix: string): string {
    const env = ensureDb(prefix);
    const host = env[`${prefix}_DB_HOST`] as string;
    const port = env[`${prefix}_DB_PORT`] as number;
    const user = env['DB_USER'] as string;
    const pass = encodeURIComponent(env['DB_PASSWORD'] as string);
    const name = env[`${prefix}_DB_NAME`] as string;
    return `postgresql://${user}:${pass}@${host}:${port}/${name}?schema=public`;
  },
};
