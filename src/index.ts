import { DataSource } from "typeorm";
import { User } from "./model/User";
import { Roles } from "./model/Roles";
import { Entity } from "./model/Entity";
import { Permission } from "./model/Permission";
import { RolePermission } from "./model/RolePermission";

const express = require("express")
const app = express();
import Container from 'typedi';
import { EntityController } from "./controller/EntityController";
import { UserController } from "./controller/UserController";
import {Response, Request, NextFunction } from "express"
import cors from "cors";


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors())
app.use(express.static('server'))

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "devemmy",
    database: "roleadministration",
    synchronize: true,
    logging: true,
    entities: [User, Roles, Entity, Permission, RolePermission],
    subscribers: [],
    "migrations": [
        "src/migration/**/*.ts"
     ],
})


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("Database now running")
    })
    .catch((error) => console.log(error))


const entityController = Container.get(EntityController);
app.get("/entity/add", (req:Request, res: Response)=>entityController.addEntities(req, res))

const userController = Container.get(UserController);
app.post("/users/sign-in",  (req: Request, res: Response)=> userController.login(req, res));
app.post("/users/sign-up",  (req: Request, res: Response)=> userController.signUp(req, res));


const port = process.env.PORT?.toString || "3030"

app.listen(port, ()=> {console.log(`Server is now running on port ${port}`)})