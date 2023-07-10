import RolesRepository from "../respository/RolesRepository";
import {Service} from "typedi";
import { returnObject } from "../utilities/response";
import PermissionRepository from "../respository/PermissionRepository";

@Service()
export class RoleService {
    constructor(private readonly roleRepository: RolesRepository, private readonly permissionRepository: PermissionRepository){

    }

    async add(role: any){
        let result = await this.roleRepository.save(role);
        return result;
    }

    async addPermissionToRole(roleId: string, permission: string | string[]){
        let role :any = await this.getOne(roleId);
        let permissions = []
        if(typeof(permission) === "object"){
            for(let i=0; i <= permission.length-1; i++ ){
                let permissionObject = await this.permissionRepository.findOne(permission[i])
                permissions.push(permissionObject)
            }
        }
        else{
            let permissionObject = await this.permissionRepository.findOne(permission);
            permissions.push(permissionObject)
        }
        role.permissions += permissions
        role = await this.updateRole(roleId, role)
        return returnObject(role);
    }

    async delete(roleId: string){
        let result = await this.roleRepository.delete(roleId);
        return result;
    }

    async updateRole(roleId: string, data: any){
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