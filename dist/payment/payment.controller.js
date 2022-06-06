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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const CreatePayment_dto_1 = require("./dto/CreatePayment.dto");
const UpdatePayment_dto_1 = require("./dto/UpdatePayment.dto");
const swagger_1 = require("@nestjs/swagger");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async getAllPayments() {
        return await this.paymentService.getAllPayments();
    }
    async getPayment(id) {
        const payment = await this.paymentService.getPayment(id);
        if (!payment) {
            throw new common_1.NotFoundException('Payment not Found');
        }
        return payment;
    }
    async createPayment(clientId, paymentData) {
        paymentData.client = clientId;
        return await this.paymentService.createNewPayment(paymentData);
    }
    async updatePayment(id, paymentData) {
        return await this.paymentService.updatePayment(id, paymentData);
    }
    async deletePayment(id) {
        return this.paymentService.deletePayment(id);
    }
};
__decorate([
    (0, common_1.Get)('/getAll'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payment has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payment has been successfully returned.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Post)('/create/:clientId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payment has been successfully created.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("clientId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreatePayment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payment has been successfully updated.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePayment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The payment has been successfully deleted.' }),
    (0, swagger_1.ApiForbiddenResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePayment", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map