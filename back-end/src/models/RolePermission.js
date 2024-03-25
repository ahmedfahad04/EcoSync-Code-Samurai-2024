"use strict";

export default (options) => {
    const { sequelize, DataTypes } = options;
    const RolePermission = sequelize.define("role_permission", {
        role_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "roles",
                key: "role_id",
            },
        },
        permission_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: "permissions",
                key: "permission_id",
            },
        },
    });

    return RolePermission;
};
