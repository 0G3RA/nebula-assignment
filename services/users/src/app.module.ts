import { Module } from '@nestjs/common';
import { DatabaseModule as DbModule } from 'src/modules/database/database.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [DbModule, UserModule],
})
export class AppModule {}
