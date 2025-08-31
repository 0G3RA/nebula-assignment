import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';
import { SchedulerService } from 'src/scheduler.service';

@Module({
  imports: [RmqModule],
  providers: [SchedulerService],
})
export class AppModule {}
