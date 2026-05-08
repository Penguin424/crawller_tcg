import { Module } from '@nestjs/common';
import { ScrapeErrorsController } from './scrape-errors.controller';
import { ScrapeErrorsService } from './scrape-errors.service';

@Module({
  controllers: [ScrapeErrorsController],
  providers: [ScrapeErrorsService],
})
export class ScrapeErrorsModule {}