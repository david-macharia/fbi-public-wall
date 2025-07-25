import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { FBIQueryParams, WantedListResponseDto } from 'src/dto/wanted.dto';
import { BASE_FBI_API_URL } from 'src/constants/endpoints';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class WantedService {
  private readonly logger = new Logger(WantedService.name);
  private readonly FBI_API = 'https://api.fbi.gov/wanted/v1/list';

  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private mapItem(item: any): any {
    return {
      id: item.uid,
      title: item.title,
      description: item.description,
      aliases: item.aliases ?? [],
      image: item.images?.map((img) => img.original) ?? [],
      nationality: item.nationality,
      details: item.details,
      race: item.race,
      sex: item.sex,
      dates_of_birth_used: item.dates_of_birth_used?.[0] ?? null,
      place_of_birth: item.place_of_birth,
      field_offices: item.field_offices ?? [],
      caution: item.caution,

      occupations: item.occupations,
      hair: item.hair_raw,
      eyes: item.eyes_raw,
      height_max: item.height_max,
      weight_max: item.weight_max,
      scars_and_marks: item.scars_and_marks,
      ncic: item.ncic,
      detailUrl: item.url,
    };
  }

  async fetchWanted(
    page: number = 1,
    query = '',
  ): Promise<WantedListResponseDto> {
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
        results: response.items.map(this.mapItem),
        total: response.total,
        page: response.page,
      };
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(`Failed to fetch FBI wanted list: ${err.message}`);
    }
  }

  async fetchWantedWithFilters(
    filters: FBIQueryParams,
  ): Promise<WantedListResponseDto> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value != null && value !== '') {
        params.append(key, value.toString());
      }
    }

    if (!params.has('page')) params.append('page', '1');

    const url = `${BASE_FBI_API_URL}?${params.toString()}`;
    this.logger.debug(`Fetching with filters: ${url}`);

    try {
      const response = await firstValueFrom(
        this.http.get(url).pipe(
          map((res) => res.data),
          catchError((e: AxiosError) => {
            throw new Error(`FBI API Error: ${e.message}`);
          }),
        ),
      );

      return {
        results: response.items.map(this.mapItem),
        total: response.total,
        page: response.page,
      };
    } catch (err) {
      this.logger.error(err.message);
      //throw new Error(`Failed to fetch FBI wanted list: ${err.message}`);
    }
  }
}
