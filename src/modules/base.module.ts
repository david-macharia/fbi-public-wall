import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisOptions } from 'src/constants/tools';

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
  ],
  exports: [HttpModule, CacheModule], // ✅ Correct
})
export class CoreModule {}
