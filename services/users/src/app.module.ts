import { RmqModule } from '@app/rmq';
import { Module } from '@nestjs/common';
import { DatabaseModule as DbModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DbModule, RmqModule, UserModule],
})
export class AppModule {}
