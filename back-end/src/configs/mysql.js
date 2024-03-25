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

const options = { sequelize, DataTypes, Sequelize, Op };

const models = {
    User: User(options),
    Role: Role(options),
    UserRole: UserRole(options),
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
