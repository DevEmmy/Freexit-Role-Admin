import RolesRepository from "../respository/RolesRepository";
import {Service} from "typedi";
import { returnObject } from "../utilities/response";

@Service()
export class RoleService {
    constructor(private readonly roleRepository: RolesRepository){

    }

    async add(role: any){
        let result = await this.roleRepository.save(role);
        return result;
    }

    async delete(roleId: string){
        let result = await this.roleRepository.delete(roleId);
        return result;
    }

    async updatePermission(roleId: string, data: any){
        let result = await this.roleRepository.update(roleId, data);
        return result;
    }

    async getAll(){
        let result = await this.roleRepository.find();
        return result;
    }

    async getOne(roleId: string){
        let result = await this.roleRepository.findOne(roleId);
        return result;
    }

    async getRolePermissions(roleId: string){
        let result = await this.roleRepository.findOne(roleId)
        let permissions = result?.permissions
        return returnObject(permissions)
    }
}