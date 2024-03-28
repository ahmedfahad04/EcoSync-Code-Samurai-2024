"use strict";

export const RoleTypes = {
    systemAdmin: "System Admin",
    stsManager: "STS Manager",
    landfillManager: "Landfill Manager",
    unassigned: "Unassigned",
};

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Role = sequelize.define("roles", {
        role_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isIn: [Object.values(RoleTypes)],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: "role_id",
        });
    };

    return Role;
};
