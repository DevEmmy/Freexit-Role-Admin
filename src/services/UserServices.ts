import { Service } from "typedi";
import UserRepository from "../respository/UserRepository";

@Service()
export class UserServices{
    constructor(private readonly userRepository: UserRepository){
    }

    async deletePermission(userId: string){
        let result = await this.userRepository.delete(userId);
        return result;
    }

    async updatePermission(userId: string, data: any){
        let result = await this.userRepository.update(userId, data);
        return result;
    }

    async getAll(){
        let result = await this.userRepository.find();
        return result;
    }

    async getOne(userId: string){
        let result = await this.userRepository.findOne(userId);
        return result;
    }
}