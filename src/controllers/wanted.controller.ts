import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FBIQueryParams, WantedListResponseDto } from 'src/dto/wanted.dto';
import { WantedService } from 'src/services/wanted.service';

@Controller('api/wanted')
@ApiTags('wanted')
@UseInterceptors(CacheInterceptor)
export class WantedController {
  constructor(private readonly wantedService: WantedService) {}
  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'field_offices', required: false })
  @ApiQuery({ name: 'race', required: false })
  @ApiQuery({ name: 'hair', required: false })
  @ApiQuery({ name: 'eyes', required: false })
  @ApiQuery({ name: 'sex', required: false })
  @ApiQuery({ name: 'nationality', required: false })
  @ApiQuery({ name: 'poster_classification', required: false })
  @ApiQuery({ name: 'person_classification', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'age_min', required: false, type: Number })
  @ApiQuery({ name: 'age_max', required: false, type: Number })
  async getWantedWithFilters(
    @Query() filters: FBIQueryParams,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters(filters);
  }

  // Search by title
  @Get('search')
  async search(@Query('title') title: string): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ title });
  }

  // Field Office
  @Get('field-office/:office')
  async byFieldOffice(
    @Param('office') office: string,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ field_offices: office });
  }

  // Hair color
  @Get('hair/:color')
  async byHair(@Param('color') color: string): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ hair: color });
  }

  // Eye color
  @Get('eyes/:color')
  async byEyes(@Param('color') color: string): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ eyes: color });
  }

  // Race
  @Get('race/:race')
  async byRace(@Param('race') race: string): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ race });
  }

  // Sex
  @Get('sex/:sex')
  async bySex(@Param('sex') sex: string): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ sex });
  }

  // Nationality
  @Get('nationality/:nat')
  async byNationality(
    @Param('nat') nat: string,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ nationality: nat });
  }

  // Status
  @Get('status/:status')
  async byStatus(
    @Param('status') status: string,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({ status });
  }

  // Poster classification
  @Get('poster-class/:type')
  async byPosterClass(
    @Param('type') type: string,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({
      poster_classification: type,
    });
  }

  // Person classification
  @Get('person-class/:type')
  async byPersonClass(
    @Param('type') type: string,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({
      person_classification: type,
    });
  }

  // Age range
  @Get('age')
  async byAge(
    @Query('min', ParseIntPipe) min: number,
    @Query('max', ParseIntPipe) max: number,
  ): Promise<WantedListResponseDto> {
    return this.wantedService.fetchWantedWithFilters({
      age_min: min,
      age_max: max,
    });
  }
}
