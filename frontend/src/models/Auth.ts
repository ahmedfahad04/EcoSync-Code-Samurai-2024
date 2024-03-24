import { UserProps } from "./Users";

export interface ISignUpRequest {
    name: string;
    userName: string;
    email: string;
    password: string;
}

export interface ISignInRequest {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: UserProps | null;
    setUser: (user: UserProps | null) => void;
    logout: () => void;
    isLoading: boolean;
}
