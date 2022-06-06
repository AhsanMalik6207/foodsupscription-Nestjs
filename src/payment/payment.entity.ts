import { Client } from '../client/client.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,OneToOne, JoinColumn } from "typeorm";
import { PaymentType } from "./payment-type.enum";
@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn({
        comment: 'The payment unique identifier',
    })
    id: number;

    @Column({
        type: 'enum',
        enum: PaymentType,
    })
    paymenttype: PaymentType

    @Column({
        type: 'bigint'
    })
    price: number;

    @CreateDateColumn()
    subscribedAt: Date;

    @OneToOne(() =>  Client, client => client.payment, { eager: true } ) 
    @JoinColumn()
    client: Client;
}