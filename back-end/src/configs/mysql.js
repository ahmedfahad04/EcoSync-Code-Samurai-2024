"use strict";

import { Sequelize } from "sequelize";
import { config } from "./config.js";

const sequelize = new Sequelize(config.mysql.database_url, {
    logging: false,
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

export { sequelize };
