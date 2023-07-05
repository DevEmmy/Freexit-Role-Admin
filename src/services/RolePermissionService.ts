import RolePermissionRepository from "../respository/RolePermissionRepository";
import {Service} from "typedi";
import { returnObject } from "../utilities/response";

@Service()
export class RolePermissionService {
    constructor(private readonly rolePermissionRepository: RolePermissionRepository){

    }

    async addRolePermission(rolePermission: string){
        let result = await this.rolePermissionRepository.save(rolePermission);
        return returnObject(result);
    }

    async deleteRolePermission(rolePermissionId: string){
        let result = await this.rolePermissionRepository.delete(rolePermissionId);
        return returnObject(result);
    }

    async updateRolePermission(rolePermissionId: string, data: any){
        let result = await this.rolePermissionRepository.update(rolePermissionId, data);
        return returnObject(result);
    }

    async getAll(){
        let result = await this.rolePermissionRepository.find();
        return returnObject(result);
    }

    async getOne(rolePermissionId: string){
        let result = await this.rolePermissionRepository.findOne(rolePermissionId);
        return returnObject(result);
    }
}