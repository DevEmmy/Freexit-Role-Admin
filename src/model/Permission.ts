import { Column, Entity, Generated } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Permission extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  permissionId?: string;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: false })
  slug?: string;

  @Column({ nullable: false })
  entityId?: string;
}
