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
exports.Payment = void 0;
const client_entity_1 = require("../client/client.entity");
const typeorm_1 = require("typeorm");
const payment_type_enum_1 = require("./payment-type.enum");
let Payment = class Payment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'The payment unique identifier',
    }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: payment_type_enum_1.PaymentType,
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymenttype", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Payment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "subscribedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.Client, client => client.payment, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", client_entity_1.Client)
], Payment.prototype, "client", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map