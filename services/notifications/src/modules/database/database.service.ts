import {
  INestApplication,
  INestApplicationContext,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'node_modules/.prisma/client';

type ApplicationType = INestApplication | INestApplicationContext;

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  static enableShutdownHooks(app: ApplicationType, db: DatabaseService) {
    const shutdown = () => {
      void (async () => {
        try {
          await db.$disconnect();
        } finally {
          await app.close();
          process.exit(0);
        }
      })();
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }
}
