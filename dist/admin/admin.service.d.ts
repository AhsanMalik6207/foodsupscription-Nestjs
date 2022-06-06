import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: Repository<Admin>);
    create(email: string, password: string): Promise<Admin>;
    findOne(condition: any): Promise<Admin>;
}
