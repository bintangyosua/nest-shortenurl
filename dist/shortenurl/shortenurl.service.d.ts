import { PrismaService } from '../prisma/prisma.service';
import { ShortenUrlDto } from './dto/shortenurl.dto';
import { Prisma } from '@prisma/client';
export declare class ShortenUrlService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    shortenUrl(dto: ShortenUrlDto, user_id: number): Promise<Prisma.UrlsCreateWithoutUserInput>;
    findUrlByCode(shortCode: string): Promise<{
        original_url: string;
        short_code: string;
        created_at: Date;
        expiry_date: Date;
    }>;
    private generateUniqueCode;
}
