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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const RegisterClient_dto_1 = require("./dto/RegisterClient.dto");
const swagger_1 = require("@nestjs/swagger");
let ClientController = class ClientController {
    constructor(clientService, jwtService) {
        this.clientService = clientService;
        this.jwtService = jwtService;
    }
    async register(body) {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const client = await this.clientService.create(body.name, body.email, hashedPassword);
        delete client.password;
        return client;
    }
    async login(email, password) {
        const client = await this.clientService.findOne({ email });
        if (!client) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        if (!await bcrypt.compare(password, client.password)) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: client.id });
        return {
            jwt: jwt,
            id: client.id,
            name: client.name,
            email: client.email,
            message: 'Client Logged In Successfully'
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Client Registration' }),
    (0, swagger_1.ApiBody)({ type: RegisterClient_dto_1.RegisterClientDto }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterClient_dto_1.RegisterClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "login", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        jwt_1.JwtService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map