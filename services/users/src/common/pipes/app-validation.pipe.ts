import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class AppValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      ...options,
    });
  }
}
