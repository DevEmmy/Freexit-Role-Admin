import { AppDataSource } from "..";
import { Entity } from "../model/Entity";

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

    async delete(userId: string){
        let result = await this.entityRepository.delete(userId)
        return result;
    }

    async update(userId: string, data: Object){
        let result = await this.entityRepository.update(userId, data)
        return result;
    }
}