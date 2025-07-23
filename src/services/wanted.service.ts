import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { FBIQueryParams, WantedListResponseDto } from 'src/dto/wanted.dto';
import { BASE_FBI_API_URL } from 'src/constants/endpoints';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { buildCacheKey } from '../constants/tools';
@Injectable()
export class WantedService {
  private readonly FBI_API = 'https://api.fbi.gov/wanted/v1/list';

  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchWanted(page: number = 1, query = '') {
    const url = `${this.FBI_API}?page=${page}&title=${encodeURIComponent(query)}`;

    try {
      const response = await firstValueFrom(
        this.http.get(url).pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            throw new Error(`FBI API Error: ${error.message}`);
          }),
        ),
      );

      return {
        results: response.items.map((item) => ({
          id: item.uid,
          name: item.title,
          image: item.images?.[0]?.original,
          description: item.description,
          aliases: item.aliases,
        })),
        total: response.total,
        page: response.page,
      };
    } catch (err) {
      throw new Error(`Failed to fetch FBI wanted list: ${err.message}`);
    }
  }

  async fetchWantedWithFilters(
    filters: FBIQueryParams,
  ): Promise<WantedListResponseDto> {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    }

    if (!params.has('page')) {
      params.append('page', '1');
    }

    const url = `${BASE_FBI_API_URL}?${params.toString()}`;
    const cacheKey = buildCacheKey(filters);
    Logger.log(`🔍 Request URL: ${url}`);
    Logger.log(`🗝️ Cache Key: ${cacheKey}`);

    try {
      const cached =
        await this.cacheManager.get<WantedListResponseDto>(cacheKey);
      if (cached) {
        Logger.log(`✅ Cache hit for key: ${cacheKey}`);
        return cached;
      } else {
        Logger.log(`🚫 Cache miss for key: ${cacheKey}`);
      }
    } catch (err) {
      Logger.error(`❌ Error reading cache: ${err.message}`);
    }
    try {
      const response = await firstValueFrom(
        this.http.get(url).pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            console.error('FBI API Error', error.message);
            throw new Error(`FBI API Error: ${error.message}`);
          }),
        ),
      );

      const mapped: WantedListResponseDto = {
        results: response.items.map((item) => ({
          id: item.uid,
          name: item.title,
          image: item.images?.[0]?.original ?? null,
          description: item.description,
          aliases: item.aliases ?? [],
        })),
        total: response.total,
        page: response.page,
      };
      await this.cacheManager.set('test_key', 'Hello', 100);
      const test = await this.cacheManager.get('test_key');
      Logger.log(`✅ Test Cache Value: ${test}`);
      // ✅ Set to Redis cache
      try {
        await this.cacheManager.set(cacheKey, mapped, 600);
        console.log(`📦 Stored in cache with key: ${cacheKey}`);
        const test = await this.cacheManager.get(cacheKey);
        Logger.log(`✅ Test Cache Value: ${test}`);
      } catch (err) {
        console.error(`❌ Failed to write to Redis: ${err.message}`);
      }
      return mapped;
    } catch (err) {
      throw new Error(`Failed to fetch FBI wanted list: ${err.message}`);
    }
  }
}
