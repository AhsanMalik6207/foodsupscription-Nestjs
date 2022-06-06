import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>
    ) {
    }
    async create(name: string, email: string, password: string) {
        const client = this.clientRepository.create({ name, email, password });
        return this.clientRepository.save(client);
    }
    async findOne(condition: any): Promise<Client> {
        return this.clientRepository.findOne(condition);
    }
}