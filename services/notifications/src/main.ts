import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Only DI-context for worker
  await NestFactory.create(AppModule);

  console.log('-- Notifications worker started --');
}

void bootstrap().catch((error) => {
  console.error('Failed to start notifications worker:', error);
  process.exit(1);
});
