import { Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class BaseModel
{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: 1, nullable: true })
    createdBy?: number;

    @Column({ default: 0 })
    updatedBy?: number;

    @Column({ default: new Date() })
    createdAt?: Date;

    @Column({ default: new Date() })
    updatedAt?: Date;

    @Column({ default: false })
    isDeleted?: boolean;
}
