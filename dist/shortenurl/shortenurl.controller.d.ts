import { ShortenUrlService } from './shortenurl.service';
import { ShortenUrlDto } from './dto/shortenurl.dto';
import { Response } from 'express';
export declare class ShortenUrlController {
    private readonly shortUrlService;
    constructor(shortUrlService: ShortenUrlService);
    createShortUrl(dto: ShortenUrlDto, request: any): Promise<{
        shortUrl: string;
        expiryDate: string | Date;
    }>;
    redirect(shortCode: string, res: Response): Promise<void>;
}
