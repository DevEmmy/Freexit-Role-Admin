import { AppDataSource } from "..";
import { Roles } from "../model/Roles";

export default class RolesRepository{
    private rolesRepository = AppDataSource.getRepository(Roles);
    
    async save(data: any){
        let result = await this.rolesRepository.save(data);
        return result;
    }

    async findOne(roleId: string){
        let result = await this.rolesRepository.findOne({ where: {roleId} });
        return result
    }

    async find(){
        let result = await this.rolesRepository.find()
        return result
    }

    async delete(userId: string){
        let result = await this.rolesRepository.delete(userId)
        return result;
    }

    async update(userId: string, data: Object){
        let result = await this.rolesRepository.update(userId, data)
        return result;
    }
}