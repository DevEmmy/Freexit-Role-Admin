import { AppDataSource } from "..";
import { Permission } from "../model/Permission";

export default class PermissionRepository{
    private permissionRepository = AppDataSource.getRepository(Permission);
    
    async save(data: any){
        let result = await this.permissionRepository.save(data);
        return result;
    }

    async findOne(permissionId: string){
        let result = await this.permissionRepository.findOne({ where: {permissionId} });
        return result
    }

    async find(){
        let result = await this.permissionRepository.find()
        return result
    }

    async delete(userId: string){
        let result = await this.permissionRepository.delete(userId)
        return result;
    }

    async update(userId: string, data: Object){
        let result = await this.permissionRepository.update(userId, data)
        return result;
    }
}