import { Weeklymenu } from "src/weeklymenu/weeklymenu.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Weeklymenu, (weeklymenu) => weeklymenu.admin)
    weeklymenu: Weeklymenu
}