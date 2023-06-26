import { Roles } from "./Roles";

const {Entity, Column, Generated, BeforeInsert, ManyToMany, JoinTable} = require("typeorm");

export enum UserType {
    BASIC = 1,
    DELIVERY_PARTNER = 2,
    ADMIN = 3
}


@Entity()
export class User{
    
    @Generated("uuid")  
    @Column()
    public userId?: String;

    @Column({ nullable: true})
    public username?: string;

    @Column({ nullable: true})
    public firstname?: string;

    @Column({ nullable: true})
    public lastname?: string;

    @Column({ nullable: true})
    public email?: string;
 
    @Column({ nullable: true})
    public password?: string;

    @Column({ nullable: false, unique: true})
    public phonenumber?: string;

    @Column({ nullable: true})
    public pin?: string;

    @Column({ nullable: true})
    public countryCode?: string;

    @Column({ nullable: true})
    public address?: string;

    @ManyToMany(()=> Roles)
    @JoinTable()
    roles?: Roles[]
}
