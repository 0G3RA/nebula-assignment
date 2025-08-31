import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';
import { QueueModule } from 'src/modules/queue/queue.module';
import { SchedulerService } from 'src/scheduler.service';

@Module({
  imports: [RmqModule, QueueModule.forRoot()],
  providers: [SchedulerService],
})
export class AppModule {}
