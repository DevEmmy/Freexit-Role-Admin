import { BaseModel } from "./BaseModel";
import { Permission } from "./Permission";
import { User } from "./User";
import { Entity, ManyToMany, Column, Generated } from "typeorm";



@Entity()
export class Roles extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  roleId?: string;

  @Column({ nullable: false })
  name?: string;

  @ManyToMany(() => User, (user: User) => user.roles)
  users?: User[];

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles)
  permissions?: Permission[];
}
