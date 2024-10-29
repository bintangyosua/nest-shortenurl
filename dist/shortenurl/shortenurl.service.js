"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenUrlService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = require("crypto");
let ShortenUrlService = exports.ShortenUrlService = class ShortenUrlService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async shortenUrl(dto, user_id) {
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
    async findUrlByCode(shortCode) {
        return this.prismaService.urls.findUnique({
            where: { short_code: shortCode },
        });
    }
    generateUniqueCode() {
        const code = crypto
            .randomBytes(10)
            .toString('base64')
            .replace(/[/+=]/g, '');
        return code.substr(0, 6);
    }
};
exports.ShortenUrlService = ShortenUrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShortenUrlService);
//# sourceMappingURL=shortenurl.service.js.map