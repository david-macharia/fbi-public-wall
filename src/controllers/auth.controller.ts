import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/dto/login.dto';
import { SignupDto } from 'src/dto/singup.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req, @Body() _: LoginDto) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.createAnonymousUser(signupDto.password);
  }
}
