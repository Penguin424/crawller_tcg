import { Module } from '@nestjs/common';
import { ScraperModule } from './scraper/scraper.module';
import { PrismaModule } from './prisma/prisma.module';
import { CardsModule } from './cards/cards.module';
import { ScrapeErrorsModule } from './scrape-errors/scrape-errors.module';
import { UnmatchedUrlErrorsModule } from './unmatched-url-errors/unmatched-url-errors.module';

@Module({
  imports: [
    PrismaModule,
    ScraperModule,
    CardsModule,
    ScrapeErrorsModule,
    UnmatchedUrlErrorsModule,
  ],
})
export class AppModule {}