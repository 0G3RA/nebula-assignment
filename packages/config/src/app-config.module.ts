import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? [path.resolve(__dirname, '../../../.env'), path.resolve(process.cwd(), '.env')]
          : undefined,
      expandVariables: true,
    }),
  ],
})
export class AppConfigModule {}
