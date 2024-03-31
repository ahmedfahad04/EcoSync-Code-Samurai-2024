"use strict";

import { Sequelize, Op, DataTypes } from "sequelize";
import { config } from "./config.js";
import { startup } from "./mysql.startup.js";

const sequelize = new Sequelize(config.mysql.database_url, {
    logging: false,
    timestamps: false,
    // define: {
    //     freezeTableName: true,
    // },
});

import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import RolePermission from "../models/RolePermission.js";

import STS from "../models/STS.js";
import Landfill from "../models/Landfill.js";
import Vehicle from "../models/Vehicle.js";
import TripEntry from "../models/TripEntry.js";

import UserSTS_Manager from "../models/UserSTS_Manager.js";
import UserLandfill_Manager from "../models/UserLandfill_Manager.js";

const options = { sequelize, DataTypes, Sequelize, Op };

const models = {
    User: User(options),
    Role: Role(options),
    Permission: Permission(options),
    RolePermission: RolePermission(options),

    STS: STS(options),
    Landfill: Landfill(options),
    Vehicle: Vehicle(options),
    TripEntry: TripEntry(options),

    UserSTS_Manager: UserSTS_Manager(options),
    UserLandfill_Manager: UserLandfill_Manager(options),
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
            .then(async () => {
                clearInterval(interval);
                console.log(`MySql connection has been established successfully.`);
                await sequelize.sync();
                await startup.start();
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

// initializeMySqlConnection();

export { Op, Sequelize, sequelize, models };
