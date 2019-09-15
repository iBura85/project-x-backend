import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    phone: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;
}