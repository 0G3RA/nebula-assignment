import { Module } from '@nestjs/common';
import { DatabaseModule as DbModule } from 'src/modules/database/database.module';

@Module({
  imports: [DbModule],
})
export class AppModule {}
