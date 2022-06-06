import { WeeklymenuService } from './weeklymenu.service';
import { UploadWeeklymenuDto } from './dto/UploadWeeklymenu.dto';
import { UpdateWeeklymenuDto } from './dto/UpdateWeeklymenu.dto';
export declare class WeeklymenuController {
    private weeklymenuService;
    constructor(weeklymenuService: WeeklymenuService);
    getAllWeeklymenus(): Promise<import("./weeklymenu.entity").Weeklymenu[]>;
    getWeeklymenu(id: number): Promise<import("./weeklymenu.entity").Weeklymenu>;
    createWeeklymenu(adminId: number, weeklymenuData: UploadWeeklymenuDto): Promise<UploadWeeklymenuDto & import("./weeklymenu.entity").Weeklymenu>;
    updateWeeklymenu(id: number, weeklymenuData: UpdateWeeklymenuDto): Promise<import("./weeklymenu.entity").Weeklymenu>;
    deleteWeeklymenu(id: number): Promise<import("./weeklymenu.entity").Weeklymenu>;
}
