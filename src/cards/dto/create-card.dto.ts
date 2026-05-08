import { IsString, IsNumber, IsOptional, IsDateString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ description: 'Card name', example: 'Arashi no Kizuna' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Card image URL', example: 'https://images.tcgplayer.com/...' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'Price as string', example: '$12.99' })
  @IsString()
  price: string;

  @ApiProperty({ description: 'Price as numeric value', example: 12.99 })
  @IsNumber()
  priceValue: number;

  @ApiProperty({ description: 'Card rarity', example: 'Legendary' })
  @IsString()
  rarity: string;

  @ApiProperty({ description: 'Card ID from set', example: 'CR-001' })
  @IsString()
  cardId: string;

  @ApiProperty({ description: 'Expansion/set name', example: 'Welcome to Rathe' })
  @IsString()
  expansion: string;

  @ApiProperty({ description: 'Source website', example: 'tcgplayer' })
  @IsString()
  source: string;

  @ApiProperty({ description: 'Card product URL', example: 'https://www.tcgplayer.com/...' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'Date the card was added', example: '2024-01-15T00:00:00.000Z' })
  @IsDateString()
  dateAdded: string;

  @ApiProperty({ description: 'Quantity in stock', example: 1 })
  @IsInt()
  quantity: number;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateCardDto {
  @ApiPropertyOptional({ description: 'Card name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Card image URL' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ description: 'Price as string' })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiPropertyOptional({ description: 'Price as numeric value' })
  @IsNumber()
  @IsOptional()
  priceValue?: number;

  @ApiPropertyOptional({ description: 'Card rarity' })
  @IsString()
  @IsOptional()
  rarity?: string;

  @ApiPropertyOptional({ description: 'Card ID from set' })
  @IsString()
  @IsOptional()
  cardId?: string;

  @ApiPropertyOptional({ description: 'Expansion/set name' })
  @IsString()
  @IsOptional()
  expansion?: string;

  @ApiPropertyOptional({ description: 'Source website' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiPropertyOptional({ description: 'Card product URL' })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ description: 'Date the card was added' })
  @IsDateString()
  @IsOptional()
  dateAdded?: string;

  @ApiPropertyOptional({ description: 'Quantity in stock' })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}