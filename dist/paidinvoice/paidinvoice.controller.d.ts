/// <reference types="multer" />
import { PaidinvoiceService } from './paidinvoice.service';
import { UploadPaidinvoiceDto } from './dto/UploadPaidinvoice.dto';
import { UpdatePaidinvoiceDto } from './dto/UpdatePaidinvoice.dto';
export declare class PaidinvoiceController {
    private paidinvoiceService;
    constructor(paidinvoiceService: PaidinvoiceService);
    getAllPaidinvoices(): Promise<import("./paidinvoice.entity").Paidinvoice[]>;
    getPaidinvoicebyClientId(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
    getPaidinvoice(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
    createPaidinvoice(clientId: number, file: Express.Multer.File, paidinvoiceData: UploadPaidinvoiceDto): Promise<UploadPaidinvoiceDto & import("./paidinvoice.entity").Paidinvoice>;
    updatePaidinvoices(id: number, file: Express.Multer.File, paidinvoiceData: UpdatePaidinvoiceDto): Promise<import("./paidinvoice.entity").Paidinvoice>;
    deletePaidinvoice(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
    seeUploadedFile(image: any, res: any): any;
}
