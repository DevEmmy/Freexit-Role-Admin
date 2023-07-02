import { AppDataSource } from "..";
import { RolePermission } from "../model/RolePermission";

export default class RolePermissionRepository{
    private rolePermissionRepository = AppDataSource.getRepository(RolePermission);
    
    async save(data: any){
        let result = await this.rolePermissionRepository.save(data);
        return result;
    }

    async findOne(rolePermissionId: string){
        let result = await this.rolePermissionRepository.findOne({ where: {rolePermissionId} });
        return result
    }

    async find(){
        let result = await this.rolePermissionRepository.find()
        return result
    }

    async delete(userId: string){
        let result = await this.rolePermissionRepository.delete(userId)
        return result;
    }

    async update(userId: string, data: Object){
        let result = await this.rolePermissionRepository.update(userId, data)
        return result;
    }
}