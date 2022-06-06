import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>){}
    async create(email: string, password: string) {
        const admin = this.adminRepository.create({ email, password });
        return this.adminRepository.save(admin);
    }
    async findOne(condition: any): Promise<Admin> {
        return this.adminRepository.findOne(condition);
    }
}