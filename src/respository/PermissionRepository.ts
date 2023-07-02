import { Service } from "typedi";
import { AppDataSource } from "..";
import { Permission } from "../model/Permission";

@Service()
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

    async delete(permissionId: string){
        let result = await this.permissionRepository.delete(permissionId)
        return result;
    }

    async update(permissionId: string, data: Object){
        let result = await this.permissionRepository.update(permissionId, data)
        return result;
    }
}