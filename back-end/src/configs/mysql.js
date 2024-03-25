"use strict";

import { Sequelize, Op, DataTypes } from "sequelize";
import { config } from "./config.js";

const sequelize = new Sequelize(config.mysql.database_url, {
    logging: false,
    timestamps: false,
});

import User from "../models/User.js";
import Role from "../models/Role.js";
import UserRole from "../models/UserRole.js";
import Permission from "../models/Permission.js";
import RolePermission from "../models/RolePermission.js";

import STS from "../models/STS.js";
import Landfill from "../models/Landfill.js";
import Vehicle from "../models/Vehicle.js";
import STSDepartureEntry from "../models/STSDepartureEntry.js";
import TruckDumpingEntry from "../models/TruckDumpingEntry.js";

import Bill from "../models/Bill.js";

const options = { sequelize, DataTypes, Sequelize, Op };

const models = {
    User: User(options),
    Role: Role(options),
    UserRole: UserRole(options),
    Permission: Permission(options),
    RolePermission: RolePermission(options),

    STS: STS(options),
    Landfill: Landfill(options),
    Vehicle: Vehicle(options),
    STSDepartureEntry: STSDepartureEntry(options),
    TruckDumpingEntry: TruckDumpingEntry(options),

    Bill: Bill(options),
};

Object.entries(models).forEach(([name, model]) => {
    if (model.associate) {
        model.associate(models);
    }
});

export function initializeMySqlConnection() {
    let count = 0;
    const interval = setInterval(() => {
        count += 1;
        sequelize
            .authenticate()
            .then(() => {
                clearInterval(interval);
                console.log(`MySql connection has been established successfully.`);
                sequelize.sync();
            })
            .catch((err) => {
                console.log("\n");
                console.error(err.message + ",", "Trying again...");
            });
        if (count > 30) {
            clearInterval(interval);
            console.error("Database connection failed");
        }
    }, 3000);
}

async function dropAllTable() {
    sequelize.drop({ force: true }).then(() => {
        console.log("Dropped all table successfully");
    });
}

// dropAllTable();
// initializeMySqlConnection();

export { Op, Sequelize, sequelize, models };
