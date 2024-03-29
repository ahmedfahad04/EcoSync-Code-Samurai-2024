export interface IUsers {
    user_id: string;
    name: string;
    userName: string;
    email: string;
    phone_number: string;
    role_id: string;
    createdAt: Date;
    updatedAt?: Date;
    role: {
        role_id: string;
        role_name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }
}