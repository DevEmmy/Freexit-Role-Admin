import { Column, Entity as DBEntity, Generated, ManyToMany, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Entity } from "./Entity";
import { Roles } from "./Roles";

@DBEntity()
export class Permission extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  permissionId?: string;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: false })
  slug?: string;

  @ManyToOne(() => Entity, (entity: Entity) => entity.permissions)
  entity?: Entity;

  @ManyToMany(() => Permission, (roles: Roles) => roles.permissions)
  roles?: Roles[];
}
