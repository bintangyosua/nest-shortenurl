import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShortenUrlService } from './shortenurl.service';
import { ShortenUrlDto } from './dto/shortenurl.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';

@Controller()
export class ShortenUrlController {
  constructor(private readonly shortUrlService: ShortenUrlService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('shortenurl')
  async createShortUrl(@Body() dto: ShortenUrlDto, @Request() request) {
    const payload = request.user;

    if (dto.customCode) {
      const urlAlreadyExists = await this.shortUrlService.findUrlByCode(
        dto.customCode,
      );

      if (urlAlreadyExists) {
        throw new BadRequestException('Custom URL already exists');
      }
    }
    const shortenedUrl = await this.shortUrlService.shortenUrl(
      dto,
      payload.sub,
    );
    return {
      shortUrl: `http://localhost:3000/${shortenedUrl.short_code}`,
      expiryDate: shortenedUrl.expiry_date,
    };
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.shortUrlService.findUrlByCode(shortCode);

    if (!url || url.expiry_date < new Date()) {
      throw new NotFoundException('URL expired or does not exist');
    }

    return res.redirect(url.original_url);
  }
}
