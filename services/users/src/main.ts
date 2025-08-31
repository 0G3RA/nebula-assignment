import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const API_CONFIG = {
  PORT: 3001,
  PREFIX: 'api',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_CONFIG.PREFIX);

  await app.listen(API_CONFIG.PORT);
  console.log('-- Users service listening on http://localhost:3001/api --');
  console.log('-- Users service listening on http://localhost:3001/api --');
}

void bootstrap().catch((error) => {
  console.error('Failed to start notifications worker:', error);
  process.exit(1);
});
