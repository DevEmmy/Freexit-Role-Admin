import { Response, Request, NextFunction } from "express";
import { UserServices } from "../services/UserServices";
import { Service } from "typedi";
import { responseFunction } from "../utilities/response";

@Service()
export class UserController{
    constructor(private readonly userService: UserServices){
    }

    async login(request: Request, response: Response){
        let data = request.body;
        let result = await this.userService.signIn(data);
        responseFunction(result, response)
    }

    async signUp(request: Request, response: Response){
        let data = request.body;
        let result = await this.userService.signUp(data);
        responseFunction(result, response)
    }
}