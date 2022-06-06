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
exports.PaidinvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paidinvoice_repository_1 = require("./paidinvoice.repository");
let PaidinvoiceService = class PaidinvoiceService {
    constructor(paidinvoiceRepository) {
        this.paidinvoiceRepository = paidinvoiceRepository;
    }
    getPaidinvoicebyCLientId(id) {
        if (!id) {
            return null;
        }
        return this.paidinvoiceRepository.findOne({
            where: { client: id },
        });
    }
    getPaidinvoice(id) {
        if (!id) {
            return null;
        }
        return this.paidinvoiceRepository.findOne(id);
    }
    async getAllPaidinvoices() {
        return await this.paidinvoiceRepository.find();
    }
    async createNewPaidinvoice(paidinvoice) {
        return await this.paidinvoiceRepository.save(paidinvoice);
    }
    async updatePaidinvoice(id, paidinvoice) {
        const update = await this.getPaidinvoice(id);
        if (paidinvoice.receipt) {
            update.receipt = paidinvoice.receipt;
        }
        return await this.paidinvoiceRepository.save(update);
    }
    async deletePaidinvoice(id) {
        const paidinvoice = await this.getPaidinvoice(id);
        if (!paidinvoice) {
            throw new common_1.NotFoundException('Paid Invoice not found');
        }
        return this.paidinvoiceRepository.remove(paidinvoice);
    }
};
PaidinvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paidinvoice_repository_1.PaidinvoiceRepository)),
    __metadata("design:paramtypes", [paidinvoice_repository_1.PaidinvoiceRepository])
], PaidinvoiceService);
exports.PaidinvoiceService = PaidinvoiceService;
//# sourceMappingURL=paidinvoice.service.js.map