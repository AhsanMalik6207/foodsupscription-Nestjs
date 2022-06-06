import { Paidinvoice } from "src/paidinvoice/paidinvoice.entity";
import { Payment } from "src/payment/payment.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Payment, payment => payment.client) 
    payment: Payment;

    @OneToOne(() => Paidinvoice, paidinvoice => paidinvoice.client) 
    paidinvoice: Paidinvoice;
}
