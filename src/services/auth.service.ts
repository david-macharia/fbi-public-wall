import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { compare, encryptPassword, generateUserId } from 'src/constants/tools';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    const isMatch = await compare(password, user.password);

    if (isMatch) {
      return user;
    }
    return null;
  }

  async createAnonymousUser(password: string): Promise<any> {
    const userId = generateUserId();
    const encryptedPassword = await encryptPassword(password);

    const user = {
      id: Date.now().toString(), // internal unique ID
      userId, // external-facing username
      username: userId, // alias
      password: encryptedPassword,
    };

    // Push to static users array
    this.usersService.create(user.username, user.password);

    const payload = {
      username: user.username,
      sub: user.id, // subject used in JWT
    };

    return {
      userId: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginDto) {
    const userValid = await this.validateUser(user.username, user.password);
    console.log('user is', userValid);
    if (userValid) {
      const payload = { username: user.username, sub: userValid.id };
      return { ...userValid, access_token: this.jwtService.sign(payload) };
    }
  }
}
