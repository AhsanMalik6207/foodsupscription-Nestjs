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
exports.WeeklymenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const weeklymenu_repository_1 = require("./weeklymenu.repository");
let WeeklymenuService = class WeeklymenuService {
    constructor(weeklymenuRepository) {
        this.weeklymenuRepository = weeklymenuRepository;
    }
    getWeeklymenu(id) {
        if (!id) {
            return null;
        }
        return this.weeklymenuRepository.findOne(id);
    }
    async getAllWeeklymenus() {
        return await this.weeklymenuRepository.find();
    }
    async createNewWeeklymenu(weeklymenu) {
        return await this.weeklymenuRepository.save(weeklymenu);
    }
    async updateWeeklymenu(id, weeklymenu) {
        const update = await this.getWeeklymenu(id);
        if (weeklymenu.day) {
            update.day = weeklymenu.day;
        }
        if (weeklymenu.date) {
            update.date = weeklymenu.date;
        }
        if (weeklymenu.items) {
            update.items = weeklymenu.items;
        }
        return await this.weeklymenuRepository.save(update);
    }
    async deleteWeeklymenu(id) {
        const weeklymenu = await this.getWeeklymenu(id);
        if (!weeklymenu) {
            throw new common_1.NotFoundException('Weeklymenu not found');
        }
        return this.weeklymenuRepository.remove(weeklymenu);
    }
};
WeeklymenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(weeklymenu_repository_1.WeeklymenuRepository)),
    __metadata("design:paramtypes", [weeklymenu_repository_1.WeeklymenuRepository])
], WeeklymenuService);
exports.WeeklymenuService = WeeklymenuService;
//# sourceMappingURL=weeklymenu.service.js.map