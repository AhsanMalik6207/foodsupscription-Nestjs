import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "src/admin/admin.entity";
@Entity('weeklymenus')

export class Weeklymenu {
    @PrimaryGeneratedColumn({
        comment: 'The weeklymenu unique identifier',
    })
    id: number;

    @Column({
        type: 'varchar',
    })
    day: string;

    @Column({
        type: 'date',
    })
    date: string;

    @Column({
        type: 'text',
    })
    items: string;

    @ManyToOne(() => Admin, (admin)=> admin.weeklymenu, { eager: true })
    @JoinColumn()
    admin: Admin;
}
