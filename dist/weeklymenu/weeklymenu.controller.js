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
exports.WeeklymenuController = void 0;
const common_1 = require("@nestjs/common");
const weeklymenu_service_1 = require("./weeklymenu.service");
const UploadWeeklymenu_dto_1 = require("./dto/UploadWeeklymenu.dto");
const UpdateWeeklymenu_dto_1 = require("./dto/UpdateWeeklymenu.dto");
const swagger_1 = require("@nestjs/swagger");
let WeeklymenuController = class WeeklymenuController {
    constructor(weeklymenuService) {
        this.weeklymenuService = weeklymenuService;
    }
    async getAllWeeklymenus() {
        return await this.weeklymenuService.getAllWeeklymenus();
    }
    async getWeeklymenu(id) {
        const weeklymenu = await this.weeklymenuService.getWeeklymenu(id);
        if (!weeklymenu) {
            throw new common_1.NotFoundException('Weekly Menu not Found');
        }
        return weeklymenu;
    }
    async createWeeklymenu(adminId, weeklymenuData) {
        weeklymenuData.admin = adminId;
        return await this.weeklymenuService.createNewWeeklymenu(weeklymenuData);
    }
    async updateWeeklymenu(id, weeklymenuData) {
        return await this.weeklymenuService.updateWeeklymenu(id, weeklymenuData);
    }
    async deleteWeeklymenu(id) {
        return this.weeklymenuService.deleteWeeklymenu(id);
    }
};
__decorate([
    (0, common_1.Get)('/getAll'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The weeklymenu has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeeklymenuController.prototype, "getAllWeeklymenus", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The weeklymenu has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WeeklymenuController.prototype, "getWeeklymenu", null);
__decorate([
    (0, common_1.Post)(`/upload/:adminId`),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The weeklymenu has been successfully uploaded.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("adminId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UploadWeeklymenu_dto_1.UploadWeeklymenuDto]),
    __metadata("design:returntype", Promise)
], WeeklymenuController.prototype, "createWeeklymenu", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The weeklymenu has been successfully updated.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateWeeklymenu_dto_1.UpdateWeeklymenuDto]),
    __metadata("design:returntype", Promise)
], WeeklymenuController.prototype, "updateWeeklymenu", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The weeklymenu has been successfully deleted.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WeeklymenuController.prototype, "deleteWeeklymenu", null);
WeeklymenuController = __decorate([
    (0, common_1.Controller)('weeklymenu'),
    __metadata("design:paramtypes", [weeklymenu_service_1.WeeklymenuService])
], WeeklymenuController);
exports.WeeklymenuController = WeeklymenuController;
//# sourceMappingURL=weeklymenu.controller.js.map