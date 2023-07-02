import { Service } from "typedi";
import PermissionRepository from "../respository/PermissionRepository";

@Service()
export class PermissionService {
    constructor(private readonly permissionRepository: PermissionRepository){

    }

    async addPermission(permission: string){
        let result = await this.permissionRepository.save(permission);
        return result;
    }

    async deletePermission(permissionId: string){
        let result = await this.permissionRepository.delete(permissionId);
        return result;
    }

    async updatePermission(permissionId: string, data: any){
        let result = await this.permissionRepository.update(permissionId, data);
        return result;
    }

    async getAll(){
        let result = await this.permissionRepository.find();
        return result;
    }

    async getOne(permissionId: string){
        let result = await this.permissionRepository.findOne(permissionId);
        return result;
    }
}