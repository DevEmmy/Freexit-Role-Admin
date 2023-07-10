import { Service } from "typedi";
import { AppDataSource } from "..";
import { Roles } from "../model/Roles";

@Service()
export default class RolesRepository{
    private rolesRepository = AppDataSource.getRepository(Roles);
    
    async save(data: any){
        let result = await this.rolesRepository.save(data);
        return result;
    }

    async findOne(roleId: string){
        let result = await this.rolesRepository.findOne({ where: {roleId}});
        return result
    }

    //{ relations: ['permissions'] }
    async find(){
        let result = await this.rolesRepository.find()
        return result
    }

    async delete(roleId: string){
        let result = await this.rolesRepository.delete(roleId)
        return result;
    }

    async update(roleId: string, data: Object){
        let result = await this.rolesRepository.update(roleId, data)
        return result;
    }
}