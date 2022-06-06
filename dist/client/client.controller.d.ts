import { ClientService } from './client.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterClientDto } from './dto/RegisterClient.dto';
export declare class ClientController {
    private readonly clientService;
    private jwtService;
    constructor(clientService: ClientService, jwtService: JwtService);
    register(body: RegisterClientDto): Promise<import("./client.entity").Client>;
    login(email: string, password: string): Promise<{
        jwt: string;
        id: number;
        name: string;
        email: string;
        message: string;
    }>;
}
