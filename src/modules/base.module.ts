import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
//import { RedisOptions } from 'src/constants/tools';
import { AuthModule } from './auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-yet';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json',
      },
      timeout: 100000,
      maxRedirects: 5,
    }),

    CacheModule.register({
      ttl: 10 * 1000 * 600,
      isGlobal: true,
      store: redisStore({
        socket: {
          host: process.env.REDIS_HOST || '127.0.0.1', // 🔧 Hardcoded Redis host
          port: (process.env.REDIS_PORT || 6379) as number,
        },
      }),
    }),
    // CacheModule.registerAsync(RedisOptions),
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
  providers: [PrismaService],
  exports: [HttpModule, CacheModule, AuthModule, PrismaService], // ✅ Correct
})
export class CoreModule {}
