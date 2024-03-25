"use strict";

// add some predefined permissions, admin will assign specific permission to the roles

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
                isIn: [permissions.map((permission) => permission.name)],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Permission.associate = (models) => {};

    return Permission;
};

export const permissions = [
    { name: "CREATE_USER", description: "can create user" },
    { name: "UPDATE_USER", description: "can update user" },
    { name: "DELETE_USER", description: "can delete user" },
];