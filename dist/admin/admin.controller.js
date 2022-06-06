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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const RegisterAdmin_dto_1 = require("./dto/RegisterAdmin.dto");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    constructor(adminService, jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }
    async register(body) {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const admin = await this.adminService.create(body.email, hashedPassword);
        delete admin.password;
        return admin;
    }
    async login(email, password) {
        const admin = await this.adminService.findOne({ email });
        if (!admin) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        if (!await bcrypt.compare(password, admin.password)) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: admin.id });
        return {
            jwt: jwt,
            id: admin.id,
            email: admin.email,
            message: 'Admin Logged In Successfully'
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Admin Registration' }),
    (0, swagger_1.ApiBody)({ type: RegisterAdmin_dto_1.RegisterAdminDto }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterAdmin_dto_1.RegisterAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map