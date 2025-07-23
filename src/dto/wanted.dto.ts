import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WantedPersonDto {
  @ApiProperty({ description: 'Unique FBI identifier for the wanted person' })
  id: string;

  @ApiProperty({ description: 'Title of the wanted case or individual' })
  title: string;

  @ApiProperty({ description: 'Description of the case or offense' })
  description: string;

  @ApiProperty({ description: 'URL to the primary image', nullable: true })
  image: string | null;

  @ApiProperty({ description: 'Field office responsible', nullable: true })
  fieldOffice: string | null;

  @ApiProperty({ description: 'Detail page URL on fbi.gov' })
  detailUrl: string;
}

export class WantedListResponseDto {
  @ApiProperty({
    type: [WantedPersonDto],
    description: 'List of wanted persons',
  })
  results: WantedPersonDto[];

  @ApiProperty({ description: 'Total number of results found' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;
}

export class FBIQueryParams {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  field_offices?: string;

  @ApiPropertyOptional()
  hair?: string;

  @ApiPropertyOptional()
  eyes?: string;

  @ApiPropertyOptional()
  race?: string;

  @ApiPropertyOptional()
  sex?: string;

  @ApiPropertyOptional()
  nationality?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  person_classification?: string;

  @ApiPropertyOptional()
  poster_classification?: string;

  @ApiPropertyOptional()
  age_min?: number;

  @ApiPropertyOptional()
  age_max?: number;
}
