import { BASE_URL } from "@/constants/Service";
import axios from "axios";

export const httpClient = axios.create({
    baseURL: BASE_URL
});
