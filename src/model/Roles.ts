import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Entity, ManyToMany, Column, Generated } from "typeorm";

export enum UserType {
  BASIC = 1,
  DELIVERY_PARTNER = 2,
  ADMIN = 3,
}

@Entity()
export class Roles extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  roleId?: string;

  @Column({ nullable: false })
  name?: string;

  @ManyToMany(() => User, (user: User) => user.roles)
  users?: User[];
}
