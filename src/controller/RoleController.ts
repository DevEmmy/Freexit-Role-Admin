import { Response, Request, NextFunction, request } from "express";
import { Inject, Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { RoleService } from "../services/RoleServices";

@Service()
export class RoleController{
    constructor(private readonly roleService: RoleService){
    }

    async add(request: Request, response: Response){
        try{
            const roles = [
                {name:"Super Admin"},
                {name:"Admin"},
                {name: "Manager"},
                {name: "Internal Users"}
            ]
            for(let i = 0; i <= roles.length-1; i++){
                let result = await this.roleService.add(roles[i]);
                console.log(result)
            }
            
            response.json({message: "Added Successfully"})
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async addPermissionsToRole(request: Request, response: Response){
        try{
            let roleId = request.params.roleId;
            let {permission} = request.body;
            let result = await this.roleService.addPermissionToRole(roleId, permission)
            responseFunction(result, response)
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async getAll(request: Request, response: Response){
        try{
            let result = await this.roleService.getAll();
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async delete(request: Request, response: Response){
        try{
            let {roleId} = request.params;
            let result = await this.roleService.delete(roleId);
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async getAllPermissions(request: Request, response: Response){
        try{
            let {roleId} = request.params;
            let result = await this.roleService.getRolePermissions(roleId)
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }
}