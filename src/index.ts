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
import validateAuth from "./middlewares/validateAuth";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Invite } from "./model/Invite";
const swaggerDocument = require('../swagger.json');
import dotenv from 'dotenv';
dotenv.config();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors())
app.use(express.static('server'))

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Roles, Entity, Permission, Invite, RolePermission],
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


const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
          info: {
            title: 'Freexit Role Administration',
            version: '1.0.0',
            description: 'API documentation for Freexit Role Admin',
          },
        },
        apis: ['./routes/*.js'], // Path to the API routes in your project
      };

      const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Entities
const entityController = Container.get(EntityController);
app.post("/entity/add", (req:Request, res: Response)=>entityController.addEntities(req, res))
app.get("/entity/all", validateAuth ,(req:Request, res: Response)=>entityController.getAllEntries(req, res))


//Users
const userController = Container.get(UserController);
app.post("/users/sign-in",  (req: Request, res: Response)=> userController.login(req, res));
app.post("/users/sign-up",  (req: Request, res: Response)=> userController.signUp(req, res));
app.post("/users/invite-user",validateAuth,  (req: Request, res: Response)=> userController.inviteUserAsAdmin(req, res));
app.post("/users/accept-invite",  (req: Request, res: Response)=> userController.acceptInvite(req, res));

//Permissions
const permissionController = Container.get(PermissionController)
app.post("/permissions/add",  (req: Request, res: Response)=> permissionController.addPermission(req, res));
app.get("/permissions/all", (req: Request, res: Response)=> permissionController.getAllPermissions(req, res));
app.delete("/permissions/delete/:permissionId", (req: Request, res: Response)=> permissionController.delete(req, res))

//3960055d-f219-4b03-9964-551ca48b0dd5
//f8409407-01b1-43ac-9f15-23c306e323a2"

//afdd2d43-66b5-4ebb-8e94-b5c132ac24fc
//a947aa2e-6836-4b10-b193-077e9082f5aa
//3960055d-f219-4b03-9964-551ca48b0dd5

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
app.post("/roles/add-permission/:roleId", (req: Request, res: Response)=> roleController.addPermissionsToRole(req, res))


const port = process.env.PORT?.toString || "3030"

app.listen(port, ()=> {console.log(`Server is now running on port ${port}`)})