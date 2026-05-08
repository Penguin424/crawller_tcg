import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ScraperService, RefreshResult, BatchRefreshResult } from './scraper.service';
import { ScrapeResult } from './interfaces/card.interface';
import { RefreshCardDto, RefreshCardsDto } from './dto/refresh-card.dto';

@ApiTags('scraper')
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('flesh-and-blood')
  @ApiOperation({ summary: 'Scrape all Flesh and Blood cards from TCGPlayer' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiResponse({ status: 200, description: 'Returns scraped cards' })
  async getCards(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ScrapeResult> {
    return this.scraperService.scrapeFleshAndBlood(page);
  }

  @Get('flesh-and-blood/search')
  @ApiOperation({ summary: 'Search for Flesh and Blood cards by name' })
  @ApiQuery({ name: 'name', required: true, type: String, description: 'Card name to search' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiResponse({ status: 200, description: 'Returns matching cards' })
  @ApiResponse({ status: 404, description: 'No cards found' })
  async searchCard(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ScrapeResult> {
    return this.scraperService.searchCardByName(name, page);
  }

  @Post('refresh-card')
  @ApiOperation({ summary: 'Refresh a single card data by URL' })
  @ApiResponse({ status: 200, description: 'Returns updated card data' })
  @ApiResponse({ status: 404, description: 'Card not found in database' })
  async refreshCard(@Body() dto: RefreshCardDto): Promise<RefreshResult> {
    return this.scraperService.refreshCard(dto.url);
  }

  @Post('refresh-cards')
  @ApiOperation({ summary: 'Batch refresh card data (all or specific IDs)' })
  @ApiResponse({ status: 200, description: 'Returns batch refresh results with updated and failed counts' })
  async refreshCards(@Body() dto: RefreshCardsDto): Promise<BatchRefreshResult> {
    return this.scraperService.refreshCards(dto.ids);
  }
}