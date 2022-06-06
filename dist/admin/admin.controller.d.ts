import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAdminDto } from './dto/RegisterAdmin.dto';
export declare class AdminController {
    private readonly adminService;
    private jwtService;
    constructor(adminService: AdminService, jwtService: JwtService);
    register(body: RegisterAdminDto): Promise<import("./admin.entity").Admin>;
    login(email: string, password: string): Promise<{
        jwt: string;
        id: number;
        email: string;
        message: string;
    }>;
}
