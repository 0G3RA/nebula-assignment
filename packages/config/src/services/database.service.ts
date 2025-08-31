import { ensureDb } from '../validators/database.validator';

export const databaseConfig = {
  /** For Building DATABASE_URL by Svc prefix (USERS/NOTIFS/…) */
  getUrl(prefix: string): string {
    const env = ensureDb(prefix);
    const host = env[`${prefix}_DB_HOST`] as string;
    const port = env[`${prefix}_DB_PORT`] as number;
    const user = env[`${prefix}_DB_USER`] as string;
    const pass = encodeURIComponent(env[`${prefix}_DB_PASSWORD`] as string);
    const name = env[`${prefix}_DB_NAME`] as string;
    return `postgresql://${user}:${pass}@${host}:${port}/${name}?schema=public`;
  },
};
