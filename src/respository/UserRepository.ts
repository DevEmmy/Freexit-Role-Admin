import {User} from "../model/User";
import { AppDataSource } from "..";

export default class UserRepository{
    private userRepository = AppDataSource.getRepository(User);
    
    async save(data: Object){
        let result = await this.userRepository.save(data);
        return result;
    }

    async findOne(userId: string){
        let result = await this.userRepository.findOne({ where: {userId} });
        return result
    }

    async find(){
        let result = await this.userRepository.find()
        return result
    }

    async delete(userId: string){
        let result = await this.userRepository.delete(userId)
        return result;
    }

    async update(userId: string, data: Object){
        let result = await this.userRepository.update(userId, data)
        return result;
    }
}

