import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cfg } from '@app/config';
import { DatabaseService as DbService } from './modules/database';

const API_CONFIG = {
  PORT: 3001,
  PREFIX: 'api',
};

async function bootstrap() {
  process.env.DATABASE_URL = cfg.dbUrl('USERS');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_CONFIG.PREFIX);

  const db = app.get(DbService);
  DbService.enableShutdownHooks(app, db);

  await app.listen(API_CONFIG.PORT);
  console.log('-- Users service listening on http://localhost:3001/api --');
}

void bootstrap().catch((error) => {
  console.error('Failed to start notifications worker:', error);
  process.exit(1);
});
