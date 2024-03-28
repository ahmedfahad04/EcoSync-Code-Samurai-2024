"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const UserSTS_Manager = sequelize.define("user_sts_manager", {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "users",
                key: "user_id",
            },
        },
        sts_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "sts",
                key: "sts_id",
            },
        },
    });

    return UserSTS_Manager;
};
