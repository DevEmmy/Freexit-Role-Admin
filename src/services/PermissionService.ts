import { Service } from "typedi";
import PermissionRepository from "../respository/PermissionRepository";
import { returnObject } from "../utilities/response";
import { CreatePermissionDTO } from "../dto/permissions/createPermissionDto";

@Service()
export class PermissionService {
    constructor(private readonly permissionRepository: PermissionRepository){

    }

    async addPermission(permission: CreatePermissionDTO){
        let result = await this.permissionRepository.save(permission);
        return returnObject(result);
    }

    async deletePermission(permissionId: string){
        let result = await this.permissionRepository.delete(permissionId);
        return returnObject(result);
    }

    async updatePermission(permissionId: string, data: any){
        let result = await this.permissionRepository.update(permissionId, data);
        return result;
    }

    async getAll(){
        let result = await this.permissionRepository.find();
        return returnObject(result);
    }

    async getOne(permissionId: string){
        let result = await this.permissionRepository.findOne(permissionId);
        return returnObject(result);
    }
}