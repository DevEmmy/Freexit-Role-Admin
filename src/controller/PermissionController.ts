import { Response, Request, NextFunction, request } from "express";
import { Inject, Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { PermissionService } from "../services/PermissionService";

@Service()
export class PermissionController{
    constructor(private readonly permissionService: PermissionService){
    }

    async addPermission(request: Request, response: Response){
        try{
            let permission = request.body;
            let result = await this.permissionService.addPermission(permission);
            responseFunction(result, response)
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async getAllPermissions(request: Request, response: Response){
        try{
            let result = await this.permissionService.getAll();
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async delete(request: Request, response: Response){
        try{
            let {permissionId} = request.params;
            let result = await this.permissionService.deletePermission(permissionId);
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }
}