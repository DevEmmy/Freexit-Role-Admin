import { Response, Request, NextFunction } from "express";
import { UserServices } from "../services/UserServices";
import { Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { RoleService } from "../services/RoleServices";
import { generatePassword } from "../utilities/password-generator";
import jwt from "jsonwebtoken"
import { STATUS, User } from "../model/User";
require("dotenv").config()

const jwt_secret = process.env.JWT_SECRET || "SNOSD9SDD"
interface Result {
    payload: any,
    message: string,
    status: number
}

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
            let result = await this.userService.signUp(user, true);
            let link = await this.generateAcceptanceLinkLink(result?.payload.result.userId)
            response.json({result, link})
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async generateAcceptanceLinkLink(userId: string){
        try{
            const expirationTime = Math.floor(Date.now() / 1000) + (30 * 60); // Set expiration time to 30 minutes
            console.log(userId)
            const token = jwt.sign({ userId, exp: expirationTime }, jwt_secret);

            const link = `https://role-admn.freexitnow.com/users/accept-invite?token=${token}`;
            return link;
        }
        catch(err:  any){
            console.log(err)
        }
    }

    async acceptInvite(request: Request, response: Response){
        try{
            const {token} = request.query;
            let t: string = String(token)
            jwt.verify(t, jwt_secret,  async (err, payload)=>{
                if(err){
                    response.json({message: err.message}).status(400)
                }
                let userId: any = payload
                let user: any = await this.userService.getOne(userId.userId)
                user.status = STATUS.ACCEPTED;
                let updated = await this.userService.update(user.userId, user)
                user = await this.userService.getOne(user.userId)

                response.json(user)
            })
        }
        catch(err:  any){
            console.log(err)
        }
    }
}