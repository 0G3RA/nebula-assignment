import { Module } from '@nestjs/common';
import { PushModule } from './modules/push/push.module';
import { WorkerModule } from './modules/worker';
import { DatabaseModule as DbModule } from './modules/database/database.module';

@Module({
  imports: [DbModule, WorkerModule.forRoot(), PushModule],
})
export class AppModule {}
