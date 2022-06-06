import { Client } from './client.entity';
import { Repository } from 'typeorm';
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    create(name: string, email: string, password: string): Promise<Client>;
    findOne(condition: any): Promise<Client>;
}
