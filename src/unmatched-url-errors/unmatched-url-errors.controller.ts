import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UnmatchedUrlErrorsService } from './unmatched-url-errors.service';

@ApiTags('unmatched-url-errors')
@Controller('unmatched-url-errors')
export class UnmatchedUrlErrorsController {
  constructor(private readonly unmatchedUrlErrorsService: UnmatchedUrlErrorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all unmatched URL errors' })
  @ApiResponse({ status: 200, description: 'Returns list of unmatched URL errors' })
  async findAll() {
    return this.unmatchedUrlErrorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific unmatched URL error by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single unmatched URL error' })
  @ApiResponse({ status: 404, description: 'Unmatched URL error not found' })
  async findOne(@Param('id') id: string) {
    return this.unmatchedUrlErrorsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific unmatched URL error' })
  @ApiResponse({ status: 200, description: 'Unmatched URL error deleted successfully' })
  @ApiResponse({ status: 404, description: 'Unmatched URL error not found' })
  async remove(@Param('id') id: string) {
    return this.unmatchedUrlErrorsService.remove(id);
  }

  @Delete('url')
  @ApiOperation({ summary: 'Delete unmatched URL error by URL' })
  @ApiQuery({ name: 'url', required: true, type: String, description: 'URL to delete error for' })
  @ApiResponse({ status: 200, description: 'Unmatched URL error deleted successfully' })
  async removeByUrl(@Query('url') url: string) {
    return this.unmatchedUrlErrorsService.removeByUrl(url);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all unmatched URL errors' })
  @ApiResponse({ status: 200, description: 'All unmatched URL errors deleted successfully' })
  async removeAll() {
    return this.unmatchedUrlErrorsService.removeAll();
  }
}