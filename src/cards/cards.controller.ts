import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cards with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'Returns paginated cards' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.cardsService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single card' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({ status: 201, description: 'Card created successfully' })
  async create(@Body() dto: CreateCardDto) {
    return this.cardsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing card' })
  @ApiResponse({ status: 200, description: 'Card updated successfully' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card' })
  @ApiResponse({ status: 200, description: 'Card deleted successfully' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}