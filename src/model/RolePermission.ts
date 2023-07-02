import { Column, Entity, Generated } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class RolePermission extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  rolePermissionId?: string;

  @Column({ nullable: false })
  roleId?: string;

  @Column({ nullable: false })
  permissionId?: string;
}