import { DataSource } from "typeorm";
import { User } from "./model/User";
import { Roles } from "./model/Roles";
import { Entity } from "./model/Entity";
import { Permission } from "./model/Permission";
import { RolePermission } from "./model/RolePermission";

const express = require("express")
const app = express();

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

const port = process.env.PORT?.toString || "3030"

app.listen(port, ()=> {console.log(`Server is now running on port ${port}`)})