import { Test, TestingModule } from '@nestjs/testing';
import { ShortenUrlService } from './shortenurl.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ShortenUrlService', () => {
  let service: ShortenUrlService;
  let prisma: PrismaService;
  let short_code: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenUrlService, PrismaService],
    }).compile();

    service = module.get<ShortenUrlService>(ShortenUrlService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a unique short URL with expiration', async () => {
    const url = 'https://www.google.com';
    const result = await service.shortenUrl(
      {
        originalUrl: url,
      },
      1,
    );

    expect(result).toHaveProperty('short_code');
    expect(result).toHaveProperty('original_url', url);
    expect(result).toHaveProperty('expiry_date');

    short_code = result.short_code;
  });

  it('should get a URL by short code', async () => {
    const mockResult = await prisma.urls.findUnique({
      where: {
        short_code: short_code,
      },
    });

    jest.spyOn(prisma.urls, 'findUnique').mockResolvedValueOnce(mockResult);

    const result = await service.findUrlByCode(short_code);

    // expect(prisma.urls.findUnique).toHaveBeenCalledWith({
    //   where: { short_code },
    // });

    expect(result).toEqual(mockResult);
  });
});
