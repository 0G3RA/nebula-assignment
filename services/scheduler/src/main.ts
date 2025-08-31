import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Only DI-context for queues and events
  await NestFactory.createApplicationContext(AppModule);

  console.log('-- Scheduler worker started --');
}

void bootstrap().catch((error) => {
  console.error('Failed to start Scheduler worker:', error);
  process.exit(1);
});
