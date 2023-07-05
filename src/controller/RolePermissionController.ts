import { Response, Request, NextFunction, request } from "express";
import { Inject, Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { RolePermissionService } from "../services/RolePermissionService";

@Service()
export class RolePermissionController{
    constructor(private readonly rolePermissionService: RolePermissionService){
    }

    async add(request: Request, response: Response){
        try{
            let rolePermission = request.body;
            let result = await this.rolePermissionService.addRolePermission(rolePermission);
            responseFunction(result, response)
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async getAll(request: Request, response: Response){
        try{
            let result = await this.rolePermissionService.getAll();
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async delete(request: Request, response: Response){
        try{
            let {rolePermissionId} = request.params;
            let result = await this.rolePermissionService.deleteRolePermission(rolePermissionId);
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }
}