import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WantedPersonDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  image: string | null;

  @ApiProperty({ nullable: true })
  field_offices: string[] | null;

  @ApiProperty({ nullable: true })
  aliases: string[] | null;

  @ApiProperty({ nullable: true })
  dates_of_birth_used: string[] | null;

  @ApiProperty({ nullable: true })
  place_of_birth: string | null;

  @ApiProperty({ nullable: true })
  sex: string | null;

  @ApiProperty({ nullable: true })
  race: string | null;

  @ApiProperty({ nullable: true })
  nationality: string | null;

  @ApiProperty({ nullable: true })
  scars_and_marks: string | null;

  @ApiProperty({ nullable: true })
  occupations: string[] | null;

  @ApiProperty({ nullable: true })
  ncic: string | null;

  @ApiProperty({ nullable: true })
  hair: string | null;

  @ApiProperty({ nullable: true })
  eyes: string | null;

  @ApiProperty({ nullable: true })
  height_min: number | null;

  @ApiProperty({ nullable: true })
  height_max: number | null;

  @ApiProperty({ nullable: true })
  weight_min: number | null;

  @ApiProperty({ nullable: true })
  weight_max: number | null;

  @ApiProperty({ nullable: true })
  details: string | null;

  @ApiProperty({ nullable: true })
  caution: string | null;

  @ApiProperty()
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
