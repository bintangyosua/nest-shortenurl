import { Module } from '@nestjs/common';
import { ShortenUrlService } from './shortenurl.service';
import { ShortenUrlController } from './shortenurl.controller';

@Module({
  providers: [ShortenUrlService],
  controllers: [ShortenUrlController],
})
export class ShortenUrlModule {}
