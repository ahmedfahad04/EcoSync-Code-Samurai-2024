import { ROLETYPE, TRUCKTYPE } from "@/constants/Global";

export const getRoleColor = (role: string | undefined): string => {
    switch (role) {
        case ROLETYPE.ROLE1:
            return "bg-red-100 text-red-800";
        case ROLETYPE.ROLE2:
            return "bg-green-100 text-green-800";
        case ROLETYPE.ROLE3:
            return "bg-purple-100 text-purple-800";
        default:
            return "bg-yellow-100 text-yellow-800"; // Default color
    }
};

export const getTruckTypeColor = (type: string | undefined): string => {
    switch (type) {
        case TRUCKTYPE.TYPE1:
            return "bg-red-100 text-red-800";
        case TRUCKTYPE.TYPE2:
            return "bg-green-100 text-green-800";
        case TRUCKTYPE.TYPE3:
            return "bg-purple-100 text-purple-800";
        default:
            return "bg-yellow-100 text-yellow-800"; // Default color
    }
};