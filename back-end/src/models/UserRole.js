"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const UserRole = sequelize.define("user_role", {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "users",
                key: "user_id",
            },
        },
        role_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "roles",
                key: "role_id",
            },
        },
    });

    return UserRole;
};
