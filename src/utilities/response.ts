import {Response} from "express";

export const responseFunction = (result: any, response: Response)=>{
    response.status(result.status || 200).json(result)
}

export const returnObject = (payload: any  = null, message: string = "Successful", status: number | null = 200 )=>{
    return {
        payload, message, status
    }
}