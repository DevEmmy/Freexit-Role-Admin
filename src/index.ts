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
import { PermissionController } from "./controller/PermissionController";
import { RolePermissionController } from "./controller/RolePermissionController";
import { RoleController } from "./controller/RoleController";


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

//Entities
const entityController = Container.get(EntityController);
app.post("/entity/add", (req:Request, res: Response)=>entityController.addEntities(req, res))
app.get("/entity/all", (req:Request, res: Response)=>entityController.getAllEntries(req, res))


//Users
const userController = Container.get(UserController);
app.post("/users/sign-in",  (req: Request, res: Response)=> userController.login(req, res));
app.post("/users/sign-up",  (req: Request, res: Response)=> userController.signUp(req, res));

//Permissions
const permissionController = Container.get(PermissionController)
app.post("/permissions/add",  (req: Request, res: Response)=> permissionController.addPermission(req, res));
app.get("/permissions/all", (req: Request, res: Response)=> permissionController.getAllPermissions(req, res));
app.delete("/permissions/delete/:permissionId", (req: Request, res: Response)=> permissionController.delete(req, res))

//3960055d-f219-4b03-9964-551ca48b0dd5
//f8409407-01b1-43ac-9f15-23c306e323a2"

//RolePermissions
const rolePermissionController = Container.get(RolePermissionController)
app.post("/role-permissions/add",  (req: Request, res: Response)=> rolePermissionController.add(req, res));
app.get("/role-permissions/all", (req: Request, res: Response)=> rolePermissionController.getAll(req, res));
app.delete("/role-permissions/delete/:permissionId", (req: Request, res: Response)=> rolePermissionController.delete(req, res))

//Roles
const roleController = Container.get(RoleController)
app.post("/roles/add",  (req: Request, res: Response)=> roleController.add(req, res));
app.get("/roles/all", (req: Request, res: Response)=> roleController.getAll(req, res));
app.get("/roles/get-permissions/roleId", (req: Request, res: Response)=> roleController.getAllPermissions(req, res));
app.delete("/roles/delete/:roleId", (req: Request, res: Response)=> roleController.delete(req, res))


const port = process.env.PORT?.toString || "3030"

app.listen(port, ()=> {console.log(`Server is now running on port ${port}`)})