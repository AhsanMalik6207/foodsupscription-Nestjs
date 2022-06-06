import { EntityRepository, Repository } from "typeorm";
import { Paidinvoice } from "./paidinvoice.entity";

@EntityRepository(Paidinvoice)
export class PaidinvoiceRepository extends Repository<Paidinvoice>{
}