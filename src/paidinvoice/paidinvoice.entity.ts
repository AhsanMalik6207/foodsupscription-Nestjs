import { Client } from "src/client/client.entity";
import { Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn} from "typeorm";

@Entity('paidinvoices')

export class Paidinvoice{
   @PrimaryGeneratedColumn({
       comment:'The paidinvoice unique identifier',
   })
   id: number;

   @Column({ type: 'varchar', length: 300, nullable: true })
   receipt: string;

   @OneToOne(() =>  Client,client => client.paidinvoice, { eager: true } ) 
   @JoinColumn()
   client: Client;
}