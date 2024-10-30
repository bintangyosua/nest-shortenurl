import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortenUrlDto } from './dto/shortenurl.dto';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class ShortenUrlService {
  constructor(private readonly prismaService: PrismaService) {}

  async shortenUrl(
    dto: ShortenUrlDto,
    user_id: number,
  ): Promise<Prisma.UrlsCreateWithoutUserInput> {
    const { originalUrl, customCode } = dto;
    const shortCode = customCode || this.generateUniqueCode();

    const createdDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);

    return await this.prismaService.urls.create({
      data: {
        short_code: shortCode,
        expiry_date: expiryDate,
        original_url: originalUrl,
        user_id: user_id,
        created_at: createdDate,
      },
    });
  }

  async findUrlByCode(shortCode: string) {
    return this.prismaService.urls.findUnique({
      where: { short_code: shortCode },
      select: {
        created_at: true,
        expiry_date: true,
        original_url: true,
        short_code: true,
      },
    });
  }

  private generateUniqueCode(): string {
    const code = crypto
      .randomBytes(10)
      .toString('base64')
      .replace(/[/+=]/g, '');
    return code.substr(0, 6); // Ambil 6 karakter pertama
  }
}
