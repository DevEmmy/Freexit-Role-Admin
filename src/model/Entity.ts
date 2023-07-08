import { Column, Entity as DbEntity, Generated, JoinTable, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Permission } from "./Permission";

@DbEntity()
export class Entity extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  entityId?: string;

  @Column({ nullable: false })
  name?: string;

  @OneToMany(()=> Permission, permission => permission.entity)
    @JoinTable()
    permissions?: Permission[]
}
