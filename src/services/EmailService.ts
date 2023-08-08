import { Service } from "typedi";

@Service()
export class EmailService{
    constructor(){

    }

    async sendEmail(receiverEmail: string, message: string, subject: string, receiverName: string){

    }
}