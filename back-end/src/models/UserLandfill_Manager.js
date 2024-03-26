"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const UserLandfill_Manager = sequelize.define("user_landfill_manager", {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "users",
                key: "user_id",
            },
        },
        landfill_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "landfills",
                key: "landfill_id",
            },
        },
    });

    return UserLandfill_Manager;
};
