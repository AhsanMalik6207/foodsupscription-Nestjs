import { Controller, Post, Body, BadRequestException, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterClientDto } from './dto/RegisterClient.dto';
import {ApiCreatedResponse,ApiBody,} from '@nestjs/swagger';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService,
        private jwtService: JwtService) { }

    @Post('register')
    @ApiCreatedResponse({ description: 'Client Registration' })
    @ApiBody({ type: RegisterClientDto })
    @UsePipes(ValidationPipe)
    async register(
        @Body() body: RegisterClientDto,
    ) {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const client = await this.clientService.create(
            body.name,
            body.email,
            hashedPassword,
        );
        delete client.password;
        return client;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const client = await this.clientService.findOne({ email });
        if (!client) {
            throw new BadRequestException('Invalid Credentials');
        }
        if (!await bcrypt.compare(password, client.password)) {
            throw new BadRequestException('Invalid Credentials');
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
}