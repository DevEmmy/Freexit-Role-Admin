import { getManager } from "typeorm";
import {User} from "../model/User";

export default class UserRepository{
    private userRepository = getManager().getRepository(User);
    
    async save(data: Object){
        let result = await this.userRepository.save(data);
        return result;
    }

    async findOne(userId: string){
        // let result = await this.userRepository.findOne({ where?: {userId} });
        // return result
    }

    async find(){
        let result = await this.userRepository.find()
        return result
    }
}

