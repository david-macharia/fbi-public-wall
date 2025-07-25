// src/domains/auth/dto/signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'pass123', description: 'Password of the user' })
  @IsString()
  @MinLength(4)
  password: string;
}
