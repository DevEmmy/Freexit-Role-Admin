import { Response, Request, NextFunction } from "express";
import { EntityService } from "../services/EntityService";
import { Inject, Service } from "typedi";

@Service()
export class EntityController{
    constructor(private readonly entityService: EntityService){
    }

    async addEntities(request: Request, response: Response){
        try{
            let entries = [{name: "BASIC_USERS"}, {name: "DELIVERY_PARTNER"}]
            let result;
            for (var i=0; i < entries.length; i++){
                let eachResult = await this.entityService.addEntity(entries[0])
                console.log("Added")
            }
            response.json("Added Successfully")
        }
        catch(err: any){
            // response.status(err.status).json(err)
            console.log(err)
        }
    }


    
}