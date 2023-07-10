import { Response, Request, NextFunction } from "express";
import { UserServices } from "../services/UserServices";
import { Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { RoleService } from "../services/RoleServices";
import { generatePassword } from "../utilities/password-generator";

@Service()
export class UserController{
    constructor(private readonly userService: UserServices, private readonly roleService: RoleService ){
    }

    async login(request: Request, response: Response){
        try{
            let data = request.body;
            let result = await this.userService.signIn(data);
            responseFunction(result, response)
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async signUp(request: Request, response: Response){
        try{
           let data = request.body;
            let result = await this.userService.signUp(data);
            responseFunction(result, response) 
        }
        catch(err:any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async inviteUserAsAdmin(request: Request, response:Response){
        try{
            let {email, roleId} = request.body;
            let user: any = {email, password: generatePassword()};
            let roleObject = await this.roleService.getOne(roleId);
            user.role = roleObject
            console.log(user)
            let result = await this.userService.signUp(user, true);
            responseFunction(result, response) 
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }
}