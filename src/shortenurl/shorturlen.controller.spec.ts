import { Test, TestingModule } from '@nestjs/testing';
import { ShortenUrlController } from './shortenurl.controller';
import { ShortenUrlService } from './shortenurl.service';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Response, response } from 'express';
import { NotFoundException } from '@nestjs/common';

describe('ShortenUrlController', () => {
  let controller: ShortenUrlController;
  let service: ShortenUrlService;
  let redirectUrl: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenUrlController],
      providers: [ShortenUrlService, PrismaService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ShortenUrlController>(ShortenUrlController);
    service = module.get<ShortenUrlService>(ShortenUrlService);
  });

  it('should create a short URL', async () => {
    const urlDto = { originalUrl: 'https://www.google.com' };

    const result = await controller.createShortUrl(urlDto, {
      user: { sub: 1 },
    });

    redirectUrl = result.shortUrl.replace('http://localhost:3000/', '');

    expect(result).toHaveProperty('shortUrl');
    expect(result).toHaveProperty('expiryDate');
  });

  it('should redirect to original URL', async () => {
    const shortCode = redirectUrl;
    const originalUrl = 'https://www.example.com';

    // const res = response;

    // Mock response object
    const res = {
      redirect: jest.fn(),
    } as unknown as Response;

    // Mock findUrlByCode to return original URL
    jest.spyOn(service, 'findUrlByCode').mockResolvedValueOnce({
      original_url: originalUrl,
      created_at: new Date(),
      short_code: shortCode,
      expiry_date: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000), // 5 years in the future
    });

    await controller.redirect(shortCode, res);

    // Assertions
    expect(service.findUrlByCode).toHaveBeenCalledWith(shortCode);
    expect(res.redirect).toHaveBeenCalledWith(originalUrl);
  });

  it('should throw NotFoundException if URL is expired or does not exist', async () => {
    const shortCode = 'expiredCode';

    // Mock findUrlByCode to return null (URL does not exist)
    jest.spyOn(service, 'findUrlByCode').mockResolvedValueOnce(null);

    await expect(
      controller.redirect(shortCode, {} as Response),
    ).rejects.toThrow(NotFoundException);
  });
});
