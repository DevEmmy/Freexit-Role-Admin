import { Response, Request, NextFunction } from "express";
import { EntityService } from "../services/EntityService";
import { Inject, Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";

@Service()
export class EntityController{
    constructor(private readonly entityService: EntityService){
    }

    async addEntities(request: Request, response: Response){
        try{
            let entity = request.body;
            let result = await this.entityService.addEntity(entity);
            response.json(result);
        }
        catch(err: any){
            response.status(err.status).json(err)
        }
    }

    async getAllEntries(request: Request, response: Response){
        try{
            let result = await this.entityService.getAll();
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }
}