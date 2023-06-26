
import { User } from "./User";

const {Entity, ManyToMany, Column, Generated, BeforeInsert} = require("typeorm");

export enum UserType {
    BASIC = 1,
    DELIVERY_PARTNER = 2,
    ADMIN = 3
}


@Entity()
export class Roles{
    
    @Generated("uuid")  
    @Column()
    public roleId?: String;

    @Column()
    public role?: String;

    @ManyToMany(() => User, (user: User) => user.roles)
    public users?: User[];
}
