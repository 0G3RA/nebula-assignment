import { Injectable } from '@nestjs/common';
import { DatabaseService as DbService } from 'src/modules/database';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DbService) {}

  async create(name: string) {
    return this.db.user.create({ data: { name } });
  }
}
