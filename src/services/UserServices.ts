import { Service } from "typedi";
import UserRepository from "../respository/UserRepository";
import bcrypt from "bcrypt";
import { returnObject } from "../utilities/response";

const saltRounds = 8

@Service()
export class UserServices{
    constructor(private readonly userRepository: UserRepository){
    }

    async signUp (data: any){
        data.password = await bcrypt.hash(data.password, saltRounds);
        let result = await this.userRepository.save(data);
        return returnObject(result, "Signed Up Successfully");
    }

    async signIn(data:any){
        let user: any = await this.userRepository.findByEmail(data.email)
        if(user){
            let doMatch = await bcrypt.compare(data.password, user.password)
            if(doMatch){
                return returnObject(user, "Signed In Successfully")
            }
            else{
                return returnObject(null, "Incorrect Password", 403)
            }
        }
        else{
            return returnObject(null, "User not Found", 404)
        }
    }

    async deletePermission(userId: string){
        let result = await this.userRepository.delete(userId);
        return returnObject(result, "Deleted Successfully");
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