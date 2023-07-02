import { Service } from "typedi";
import { AppDataSource } from "..";
import { Entity } from "../model/Entity";


@Service()
export default class EntityRepository{
    private entityRepository = AppDataSource.getRepository(Entity);
    
    async save(data: any){
        let result = await this.entityRepository.save(data);
        return result;
    }

    async findOne(entityId: string){
        let result = await this.entityRepository.findOne({ where: {entityId} });
        return result
    }

    async find(){
        let result = await this.entityRepository.find()
        return result
    }

    async delete(entityId: string){
        let result = await this.entityRepository.delete(entityId)
        return result;
    }

    async update(entityId: string, data: Object){
        let result = await this.entityRepository.update(entityId, data)
        return result;
    }
}