import { Module } from '@nestjs/common';
import { UnmatchedUrlErrorsController } from './unmatched-url-errors.controller';
import { UnmatchedUrlErrorsService } from './unmatched-url-errors.service';

@Module({
  controllers: [UnmatchedUrlErrorsController],
  providers: [UnmatchedUrlErrorsService],
})
export class UnmatchedUrlErrorsModule {}