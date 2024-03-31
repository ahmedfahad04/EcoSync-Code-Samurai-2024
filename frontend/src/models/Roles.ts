export interface IRole {
    role_id: string;
    role_name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPermission {
    permission_id: string;
    permission_name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
