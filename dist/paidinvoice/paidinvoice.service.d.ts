import { PaidinvoiceRepository } from './paidinvoice.repository';
import { UploadPaidinvoiceDto } from './dto/UploadPaidinvoice.dto';
import { UpdatePaidinvoiceDto } from './dto/UpdatePaidinvoice.dto';
export declare class PaidinvoiceService {
    private paidinvoiceRepository;
    constructor(paidinvoiceRepository: PaidinvoiceRepository);
    getPaidinvoicebyCLientId(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
    getPaidinvoice(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
    getAllPaidinvoices(): Promise<import("./paidinvoice.entity").Paidinvoice[]>;
    createNewPaidinvoice(paidinvoice: UploadPaidinvoiceDto): Promise<UploadPaidinvoiceDto & import("./paidinvoice.entity").Paidinvoice>;
    updatePaidinvoice(id: number, paidinvoice: UpdatePaidinvoiceDto): Promise<import("./paidinvoice.entity").Paidinvoice>;
    deletePaidinvoice(id: number): Promise<import("./paidinvoice.entity").Paidinvoice>;
}
