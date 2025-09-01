import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cfg } from '@app/config';
import { DatabaseService as DbService } from './modules/database';

async function bootstrap() {
  process.env.DATABASE_URL = cfg.dbUrl('NOTIFS');

  console.log(cfg.dbUrl('NOTIFS'));

  // Only DI-context for worker
  const app = await NestFactory.createApplicationContext(AppModule);

  const db = app.get(DbService);
  DbService.enableShutdownHooks(app, db);

  console.log('-- Notifications worker started --');
}

void bootstrap().catch((error) => {
  console.error('Failed to start notifications worker:', error);
  process.exit(1);
});
