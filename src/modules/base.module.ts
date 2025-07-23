import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisOptions } from 'src/constants/tools';
import { AuthModule } from './auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json',
      },
      timeout: 50000,
      maxRedirects: 5,
    }),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        { name: 'search', limit: 1, ttl: 60 },
        {
          name: 'default',
          limit: 1,
          ttl: 60,
        },
      ],
    }),
  ],
  exports: [HttpModule, CacheModule, AuthModule], // ✅ Correct
})
export class CoreModule {}
