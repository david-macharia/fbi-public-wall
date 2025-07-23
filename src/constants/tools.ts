function buildCacheKey(filters: Record<string, any>): string {
  const parts = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return `wanted:${parts || 'all'}`;
}
export { buildCacheKey };
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: '127.0.0.1', // 🔧 Hardcoded Redis host
        port: 6379, // 🔧 Hardcoded Redis port
      },
    });

    return {
      store: () => store,
      ttl: 600, // Optional default TTL (10 minutes)
    };
  },
};
