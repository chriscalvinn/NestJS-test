import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class clientdata{
    
    @Column()
    username: string;

    @Column()
    userdata: string;

    @PrimaryGeneratedColumn()
    id: number;
}