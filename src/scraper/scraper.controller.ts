import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScrapeResult } from './interfaces/card.interface';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('flesh-and-blood')
  async getCards(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ScrapeResult> {
    return this.scraperService.scrapeFleshAndBlood(page);
  }

  @Get('flesh-and-blood/search')
  async searchCard(
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ScrapeResult> {
    return this.scraperService.searchCardByName(name, page);
  }
}
