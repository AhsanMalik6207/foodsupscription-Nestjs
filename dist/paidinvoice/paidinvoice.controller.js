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
exports.PaidinvoiceController = void 0;
const common_1 = require("@nestjs/common");
const paidinvoice_service_1 = require("./paidinvoice.service");
const UploadPaidinvoice_dto_1 = require("./dto/UploadPaidinvoice.dto");
const UpdatePaidinvoice_dto_1 = require("./dto/UpdatePaidinvoice.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_uploading_utils_1 = require("../utils/file-uploading.utils");
const swagger_1 = require("@nestjs/swagger");
let PaidinvoiceController = class PaidinvoiceController {
    constructor(paidinvoiceService) {
        this.paidinvoiceService = paidinvoiceService;
    }
    async getAllPaidinvoices() {
        const books = await this.paidinvoiceService.getAllPaidinvoices();
        return books;
    }
    async getPaidinvoicebyClientId(id) {
        const paidinvoice = await this.paidinvoiceService.getPaidinvoicebyCLientId(id);
        if (!paidinvoice) {
            throw new common_1.NotFoundException('Paid Invoice not Found');
        }
        return paidinvoice;
    }
    async getPaidinvoice(id) {
        const paidinvoice = await this.paidinvoiceService.getPaidinvoice(id);
        if (!paidinvoice) {
            throw new common_1.NotFoundException('Paid Invoice not Found');
        }
        return paidinvoice;
    }
    async createPaidinvoice(clientId, file, paidinvoiceData) {
        paidinvoiceData.client = clientId;
        paidinvoiceData.receipt = file.filename;
        return await this.paidinvoiceService.createNewPaidinvoice(paidinvoiceData);
    }
    async updatePaidinvoices(id, file, paidinvoiceData) {
        paidinvoiceData.receipt = file.filename;
        return await this.paidinvoiceService.updatePaidinvoice(id, paidinvoiceData);
    }
    async deletePaidinvoice(id) {
        return this.paidinvoiceService.deletePaidinvoice(id);
    }
    seeUploadedFile(image, res) {
        return res.sendFile(image, { root: './files' });
    }
};
__decorate([
    (0, common_1.Get)('/getAll'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paid invoices has been successfully returned.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "getAllPaidinvoices", null);
__decorate([
    (0, common_1.Get)('getPaidinvoicebyClientId/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paid invoice of this client has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "getPaidinvoicebyClientId", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paid invoice has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "getPaidinvoice", null);
__decorate([
    (0, common_1.Post)('/upload/:clientId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paid invoice has been successfully uploaded.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("paidreceipts", {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("clientId")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, UploadPaidinvoice_dto_1.UploadPaidinvoiceDto]),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "createPaidinvoice", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paidinvoice has been successfully updated.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("paidreceipts", {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, UpdatePaidinvoice_dto_1.UpdatePaidinvoiceDto]),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "updatePaidinvoices", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The paidinvoice has been successfully deleted.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaidinvoiceController.prototype, "deletePaidinvoice", null);
__decorate([
    (0, common_1.Get)('getImg/:imgpath'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The image has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('imgpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaidinvoiceController.prototype, "seeUploadedFile", null);
PaidinvoiceController = __decorate([
    (0, common_1.Controller)('paidinvoice'),
    __metadata("design:paramtypes", [paidinvoice_service_1.PaidinvoiceService])
], PaidinvoiceController);
exports.PaidinvoiceController = PaidinvoiceController;
//# sourceMappingURL=paidinvoice.controller.js.map