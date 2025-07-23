import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ example: 'david', description: 'Username of the user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'pass123', description: 'Password of the user' })
  @IsString()
  @MinLength(4)
  password: string;
}
