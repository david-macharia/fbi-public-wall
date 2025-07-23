// src/users/users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public users = [
    {
      id: 1,
      username: 'david',
      password: 'pass123',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
