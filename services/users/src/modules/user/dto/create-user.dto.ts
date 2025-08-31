import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 2 characters long' })
  @MaxLength(32, { message: 'Name must not exceed 48 characters' })
  name!: string;
}
