import { Response, Request, NextFunction } from "express";
import { UserServices } from "../services/UserServices";
import { Service } from "typedi";
import { responseFunction, returnObject } from "../utilities/response";
import { RoleService } from "../services/RoleServices";
import { generatePassword } from "../utilities/password-generator";
import jwt from "jsonwebtoken"
import { STATUS, User } from "../model/User";
import { InviteService } from "../services/InviteServices";
import dotenv from 'dotenv';
dotenv.config();

const jwt_secret = String(process.env.JWT_SECRET)
const frontendUrl = String(process.env.FRONTEND_URL)

interface Result {
    payload: any,
    message: string,
    status: number
}

@Service()
export class UserController{
    constructor(private readonly userService: UserServices, private readonly roleService: RoleService, private readonly inviteService: InviteService ){
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
            let user: any = {email};
            let roleObject = await this.roleService.getOne(roleId);
            user.role = roleObject
            let result = await this.inviteService.getOne(email)
            if(!result){
                result = await this.inviteService.addinvite(user);
            }
            let link = await this.generateAcceptanceLinkLink(email)
            response.json({result, link})
        }
        catch(err: any){
            let result = returnObject(null, err.message, err.status)
            responseFunction(result, response)
        }
    }

    async generateAcceptanceLinkLink(email: string){
        try{
            const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
            const token = jwt.sign({ email, exp: expirationTime }, jwt_secret);

            const link = `${frontendUrl}/users/accept-invite?token=${token}`;
            return link;
        }
        catch(err:  any){
            console.log(err)
        }
    }

    async acceptInvite(request: Request, response: Response){
        try{
            const {token} = request.query;
            const user = request.body;
            let t: string = String(token)
            jwt.verify(t, jwt_secret,  async (err, payload)=>{
                if(err){
                    response.json({message: err.message}).status(400)
                }
                let email: any = payload;
                if(email.email === user.email){
                    let invite:any = await this.inviteService.getOne(email.email)
                    invite.status = STATUS.ACCEPTED;
                    invite = await this.inviteService.updateinvite(invite.inviteId, invite)
                    let result = await this.userService.signUp(user);
                    // responseFunction(result, response) 
                    response.json(result)
                }
                else{
                    response.json({message: "This Service isn't Allowed!"})
                }
            })
        }
        catch(err:  any){
            console.log(err)
        }
    }
}