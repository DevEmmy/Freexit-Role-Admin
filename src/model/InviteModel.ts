import { ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";

import  {Entity, Column, Generated, BeforeInsert, ManyToMany, JoinTable} from "typeorm";

export enum STATUS {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED"
}


@Entity()
export class Invite extends BaseModel{
    
    @Generated("uuid")  
    @Column()
    public inviteId?: string;

    @Column({ nullable: false,unique: true})
    public email?: string;

    @Column({nullable: false, type: "enum",
    enum: STATUS,
    default: STATUS.PENDING})
    public status?: STATUS.PENDING
}
