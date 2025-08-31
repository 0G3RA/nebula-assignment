import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(username: string) {
    const user = await this.userRepo.create(username);

    return user;
  }
}
