import { Service } from "typedi";
import { AppDataSource } from "..";
import { Invite } from "../model/Invite";


@Service()
export default class InviteRepository{
    private InviteRepository = AppDataSource.getRepository(Invite);
    
    async save(data: any){
        let result = await this.InviteRepository.save(data);
        return result;
    }

    async findOne(inviteId: string){
        let result = await this.InviteRepository.findOne({ where: {inviteId} });
        return result
    }

    async find(){
        let result = await this.InviteRepository.find()
        return result
    }

    async delete(inviteId: string){
        let result = await this.InviteRepository.delete(inviteId)
        return result;
    }

    async update(inviteId: string, data: Object){
        let result = await this.InviteRepository.update(inviteId, data)
        return result;
    }
}