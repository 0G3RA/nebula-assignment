import { Global, Module } from '@nestjs/common';
import { RmqService } from './services/rmq.service';

@Global()
@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
