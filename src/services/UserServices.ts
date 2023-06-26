import { getManager,  } from "typeorm";
import UserRepository from "../respository/UserRepository";


export class UserServices{
    constructor(private readonly userRepository: UserRepository){
    }

}