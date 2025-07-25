import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { SignupDto } from 'src/dto/singup.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.createAnonymousUser(signupDto.password);
  }
}
