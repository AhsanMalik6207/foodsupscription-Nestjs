import { WeeklymenuRepository } from './weeklymenu.repository';
import { UploadWeeklymenuDto } from './dto/UploadWeeklymenu.dto';
import { UpdateWeeklymenuDto } from './dto/UpdateWeeklymenu.dto';
export declare class WeeklymenuService {
    private weeklymenuRepository;
    constructor(weeklymenuRepository: WeeklymenuRepository);
    getWeeklymenu(id: number): Promise<import("./weeklymenu.entity").Weeklymenu>;
    getAllWeeklymenus(): Promise<import("./weeklymenu.entity").Weeklymenu[]>;
    createNewWeeklymenu(weeklymenu: UploadWeeklymenuDto): Promise<UploadWeeklymenuDto & import("./weeklymenu.entity").Weeklymenu>;
    updateWeeklymenu(id: number, weeklymenu: UpdateWeeklymenuDto): Promise<import("./weeklymenu.entity").Weeklymenu>;
    deleteWeeklymenu(id: number): Promise<import("./weeklymenu.entity").Weeklymenu>;
}
