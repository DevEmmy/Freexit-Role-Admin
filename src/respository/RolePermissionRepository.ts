import { Service } from "typedi";
import { AppDataSource } from "..";
import { RolePermission } from "../model/RolePermission";

@Service()
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

    async delete(rolePermissionId: string){
        let result = await this.rolePermissionRepository.delete(rolePermissionId)
        return result;
    }

    async update(rolePermissionId: string, data: Object){
        let result = await this.rolePermissionRepository.update(rolePermissionId, data)
        return result;
    }
}