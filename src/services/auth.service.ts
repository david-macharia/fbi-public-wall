import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { generateUserId } from 'src/constants/tools';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
  async createAnonymousUser(password: string): Promise<any> {
    const userId = generateUserId();
    const user = {
      id: this.usersService.users.length + 1,
      userId, // external-facing ID
      username: userId, // or keep both
      password: password,
    };
    this.usersService.users.push(user);
    const payload = { username: user.username, sub: user.id };

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
