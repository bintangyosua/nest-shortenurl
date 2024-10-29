import { PrismaService } from 'src/prisma/prisma.service';
import { ShortenUrlDto } from './dto/shortenurl.dto';
import { Prisma } from '@prisma/client';
export declare class ShortenUrlService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    shortenUrl(dto: ShortenUrlDto, user_id: number): Promise<Prisma.UrlsCreateWithoutUserInput>;
    findUrlByCode(shortCode: string): Promise<{
        id: number;
        original_url: string;
        short_code: string;
        created_at: Date;
        expiry_date: Date;
        user_id: number;
    }>;
    private generateUniqueCode;
}
