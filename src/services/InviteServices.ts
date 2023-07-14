import { Service } from "typedi";
import InviteRepository from "../respository/InviteRepository";

@Service()
export class InviteService {
    constructor(private readonly inviteRepository: InviteRepository){}

    async addinvite(invite: Object){
        let result = await this.inviteRepository.save(invite);
        return result;
    }

    async deleteinvite(inviteId: string){
        let result = await this.inviteRepository.delete(inviteId);
        return result;
    }

    async updateinvite(inviteId: string, data: any){
        let result = await this.inviteRepository.update(inviteId, data);
        return result;
    }

    async getAll(){
        let result = await this.inviteRepository.find();
        return result;
    }

    async getOne(inviteId: string){
        let result = await this.inviteRepository.findOne(inviteId);
        return result;
    }
}