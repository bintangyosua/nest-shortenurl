import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  @MaxLength(16)
  customCode?: string;
}
