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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenUrlController = void 0;
const common_1 = require("@nestjs/common");
const shortenurl_service_1 = require("./shortenurl.service");
const shortenurl_dto_1 = require("./dto/shortenurl.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ShortenUrlController = exports.ShortenUrlController = class ShortenUrlController {
    constructor(shortUrlService) {
        this.shortUrlService = shortUrlService;
    }
    async createShortUrl(dto, request) {
        const payload = request.user;
        if (dto.customCode) {
            const urlAlreadyExists = await this.shortUrlService.findUrlByCode(dto.customCode);
            if (urlAlreadyExists) {
                throw new common_1.BadRequestException('Custom URL already exists');
            }
        }
        const shortenedUrl = await this.shortUrlService.shortenUrl(dto, payload.sub);
        return {
            shortUrl: `http://localhost:3000/${shortenedUrl.short_code}`,
            expiryDate: shortenedUrl.expiry_date,
        };
    }
    async redirect(shortCode, res) {
        const url = await this.shortUrlService.findUrlByCode(shortCode);
        if (!url || url.expiry_date < new Date()) {
            throw new common_1.NotFoundException('URL expired or does not exist');
        }
        return res.redirect(url.original_url);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('shortenurl'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shortenurl_dto_1.ShortenUrlDto, Object]),
    __metadata("design:returntype", Promise)
], ShortenUrlController.prototype, "createShortUrl", null);
__decorate([
    (0, common_1.Get)(':shortCode'),
    __param(0, (0, common_1.Param)('shortCode')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShortenUrlController.prototype, "redirect", null);
exports.ShortenUrlController = ShortenUrlController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [shortenurl_service_1.ShortenUrlService])
], ShortenUrlController);
//# sourceMappingURL=shortenurl.controller.js.map