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
exports.Paidinvoice = void 0;
const client_entity_1 = require("../client/client.entity");
const typeorm_1 = require("typeorm");
let Paidinvoice = class Paidinvoice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'The paidinvoice unique identifier',
    }),
    __metadata("design:type", Number)
], Paidinvoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", String)
], Paidinvoice.prototype, "receipt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => client_entity_1.Client, client => client.paidinvoice, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", client_entity_1.Client)
], Paidinvoice.prototype, "client", void 0);
Paidinvoice = __decorate([
    (0, typeorm_1.Entity)('paidinvoices')
], Paidinvoice);
exports.Paidinvoice = Paidinvoice;
//# sourceMappingURL=paidinvoice.entity.js.map