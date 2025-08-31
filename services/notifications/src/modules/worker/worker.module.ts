import { DynamicModule, Global, Module } from '@nestjs/common';
import { redisProvider } from './providers/redis.provider';
import { PushModule } from '../push/push.module';
import { pushWorkerProvider } from './providers';

@Global()
@Module({})
export class WorkerModule {
  static forRoot(): DynamicModule {
    return {
      module: WorkerModule,
      imports: [PushModule],
      providers: [redisProvider, pushWorkerProvider],
      exports: [redisProvider, pushWorkerProvider],
      global: true,
    };
  }
}
