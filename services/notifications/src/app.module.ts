import { Module } from '@nestjs/common';
import { PushModule } from './modules/push/push.module';
import { WorkerModule } from './modules/worker';

@Module({
  imports: [WorkerModule.forRoot(), PushModule],
})
export class AppModule {}
