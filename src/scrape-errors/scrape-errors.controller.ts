import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ScrapeErrorsService } from './scrape-errors.service';

@ApiTags('scrape-errors')
@Controller('scrape-errors')
export class ScrapeErrorsController {
  constructor(private readonly scrapeErrorsService: ScrapeErrorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all scrape errors, optionally filtered by cardId' })
  @ApiQuery({ name: 'cardId', required: false, type: String, description: 'Filter errors by card ID' })
  @ApiResponse({ status: 200, description: 'Returns list of scrape errors' })
  async findAll(@Query('cardId') cardId?: string) {
    return this.scrapeErrorsService.findAll(cardId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific scrape error by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single scrape error' })
  @ApiResponse({ status: 404, description: 'Scrape error not found' })
  async findOne(@Param('id') id: string) {
    return this.scrapeErrorsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific scrape error' })
  @ApiResponse({ status: 200, description: 'Scrape error deleted successfully' })
  @ApiResponse({ status: 404, description: 'Scrape error not found' })
  async remove(@Param('id') id: string) {
    return this.scrapeErrorsService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all scrape errors for a specific card' })
  @ApiQuery({ name: 'cardId', required: true, type: String, description: 'Card ID to delete errors for' })
  @ApiResponse({ status: 200, description: 'Scrape errors deleted successfully' })
  async removeByCardId(@Query('cardId') cardId: string) {
    return this.scrapeErrorsService.removeByCardId(cardId);
  }
}