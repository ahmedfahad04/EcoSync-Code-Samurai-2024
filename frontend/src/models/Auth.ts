import { IUsers } from "./Users";

export interface ISignUpRequest {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface ISignInRequest {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: IUsers | null;
    setUser: (user: IUsers | null) => void;
    logout: () => void;
    isLoading: boolean;
}
