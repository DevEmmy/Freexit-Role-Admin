import RolePermissionRepository from "../respository/RolePermissionRepository";
import {Service} from "typedi";

@Service()
export class RolePermissionService {
    constructor(private readonly rolePermissionRepository: RolePermissionRepository){

    }

    async addPermission(rolePermission: string){
        let result = await this.rolePermissionRepository.save(rolePermission);
        return result;
    }

    async deletePermission(rolePermissionId: string){
        let result = await this.rolePermissionRepository.delete(rolePermissionId);
        return result;
    }

    async updatePermission(rolePermissionId: string, data: any){
        let result = await this.rolePermissionRepository.update(rolePermissionId, data);
        return result;
    }

    async getAll(){
        let result = await this.rolePermissionRepository.find();
        return result;
    }

    async getOne(rolePermissionId: string){
        let result = await this.rolePermissionRepository.findOne(rolePermissionId);
        return result;
    }
}