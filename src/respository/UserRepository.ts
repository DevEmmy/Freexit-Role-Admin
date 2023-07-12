import {User} from "../model/User";
import { AppDataSource } from "..";
import { Service } from "typedi";


@Service()
export default class UserRepository{
    private userRepository = AppDataSource.getRepository(User);
    
    async save(data: any){
        let result = await this.userRepository.save(data);
        return result;
    }

    async findOne(userId: string){
        let result = await this.userRepository.findOne({ where: {userId} });
        return result
    }

    async findByEmail(email: string){
        let result = await this.userRepository.findOne({ where: {email} });
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
        let result = await this.userRepository.update( {userId} , data)
        return result;
    }
}