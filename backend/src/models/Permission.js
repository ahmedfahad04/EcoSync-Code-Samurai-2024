"use strict";

import { permissionData } from "../api/permissions/permissions.data.js";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Permission = sequelize.define("permissions", {
        permission_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        permission_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isIn: [permissionData.map((permission) => permission.permission_name)],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Role, {
            thorugh: models.RolePermission,
            foreignKey: "permission_id",
        });
    };

    return Permission;
};