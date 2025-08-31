import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { pick } from 'lodash';
import { CREATION_RESPONSE_FIELD } from './user.constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name }: CreateUserDto) {
    const user = await this.userService.create(name);

    return pick(user, CREATION_RESPONSE_FIELD);
  }
}
