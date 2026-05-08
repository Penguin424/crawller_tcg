import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshCardDto {
  @ApiProperty({ description: 'URL of the card to refresh', example: 'https://www.tcgplayer.com/product/123456' })
  @IsString()
  url: string;
}

export class RefreshCardsDto {
  @ApiPropertyOptional({ description: 'Array of card IDs to refresh (empty = all cards)', example: ['uuid1', 'uuid2'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];
}