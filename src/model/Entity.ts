import { Column, Entity as DbEntity, Generated } from "typeorm";
import { BaseModel } from "./BaseModel";

@DbEntity()
export class Entity extends BaseModel {
  @Generated("uuid")
  @Column({ nullable: false })
  entityId?: string;

  @Column({ nullable: false })
  name?: string;
}
