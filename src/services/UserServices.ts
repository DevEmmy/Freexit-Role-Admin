import { Service } from "typedi";
import UserRepository from "../respository/UserRepository";
import bcrypt from "bcrypt";
import { returnObject } from "../utilities/response";
import jwt from "jsonwebtoken"
require("dotenv").config()

const jwt_secret = process.env.JWT_SECRET || "SNOSD9SDD"

const saltRounds = 8


@Service()
export class UserServices{
    constructor(private readonly userRepository: UserRepository){
    }

    async getToken(userId: string){
        const token = jwt.sign({userId}, jwt_secret);
        return token;
    }

    async signUp (data: any, revealPassword: boolean = false){
        try{
            let initialPassword = data.password
            data.password = await bcrypt.hash(data.password, saltRounds);
            let result = await this.userRepository.save(data);
            let token = await this.getToken(result.userId)
                if(revealPassword){
                    result.password = initialPassword;
                }
            return returnObject({result, token}, "Signed Up Successfully");
        }
        catch(err: any){
            returnObject(null, err.message, err.status)
        }
       
    }

    async signIn(data:any){
        let user: any = await this.userRepository.findByEmail(data.email)
        if(user){
            let doMatch = await bcrypt.compare(data.password, user.password)
            if(doMatch){
                let token = await this.getToken(user.userId)
                return returnObject({user, token}, "Signed In Successfully")
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

    async update(userId: string, data: any){
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