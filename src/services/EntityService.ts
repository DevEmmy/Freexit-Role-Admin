import { Service } from "typedi";
import EntityRepository from "../respository/EntityRepository";

@Service()
export class EntityService {
    constructor(private readonly entityRepository: EntityRepository){}

    async addEntity(entity: Object){
        let result = await this.entityRepository.save(entity);
        return result;
    }

    async deleteEntity(entityId: string){
        let result = await this.entityRepository.delete(entityId);
        return result;
    }

    async updateEntity(entityId: string, data: any){
        let result = await this.entityRepository.update(entityId, data);
        return result;
    }

    async getAll(){
        let result = await this.entityRepository.find();
        return result;
    }

    async getOne(entityId: string){
        let result = await this.entityRepository.findOne(entityId);
        return result;
    }
}