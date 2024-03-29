import { permissionConstants as pc } from "../constants/permissions.constants.js";

export const permissionData = [
    // roles
    { permission_name: pc.CREATE_ROLE, description: "Unknown" },
    { permission_name: pc.FIND_ONE_ROLE, description: "Unknown" },
    { permission_name: pc.FIND_ALL_ROLE, description: "Unknown" },
    { permission_name: pc.UPDATE_ROLE, description: "Unknown" },
    { permission_name: pc.DELETE_ROLE, description: "Unknown" },

    { permission_name: pc.ADD_PERMISSION_TO_ROLE, description: "Unknown" },
    { permission_name: pc.REMOVE_PERMISSION_FROM_ROLE, description: "Unknown" },
    { permission_name: pc.FIND_ALL_PERMISSION_OF_ROLE, description: "Unknown" },

    // permissions
    { permission_name: pc.FIND_ALL_PERMISSION, description: "Unknown" },
    { permission_name: pc.FIND_ONE_PERMISSION, description: "Unknown" },

    // users
    { permission_name: pc.CREATE_USER, description: "Unknown" },
    { permission_name: pc.FIND_ALL_USER, description: "Unknown" },
    { permission_name: pc.FIND_ONE_USER, description: "Unknown" },
    { permission_name: pc.UPDATE_USER, description: "Unknown" },
    { permission_name: pc.DELETE_USER, description: "Unknown" },

    { permission_name: pc.ADD_ROLE_TO_USER, description: "Unknown" },
    { permission_name: pc.REMOVE_ROLE_FROM_USER, description: "Unknown" },

    // profile
    { permission_name: pc.FIND_PROFILE, description: "Unknown" },
    { permission_name: pc.UPDATE_PROFILE, description: "Unknown" },

    // vehicles
    { permission_name: pc.CREATE_VEHICLE, description: "Unknown" },
    { permission_name: pc.FIND_ALL_VEHICLE, description: "Unknown" },
    { permission_name: pc.FIND_ONE_VEHICLE, description: "Unknown" },
    { permission_name: pc.UPDATE_VEHICLE, description: "Unknown" },
    { permission_name: pc.DELETE_VEHICLE, description: "Unknown" },

    { permission_name: pc.ADD_DRIVER_TO_VEHICLE, description: "Unknown" },

    // sts
    { permission_name: pc.CREATE_STS, description: "Unknown" },
    { permission_name: pc.FIND_ALL_STS, description: "Unknown" },
    { permission_name: pc.FIND_ONE_STS, description: "Unknown" },
    { permission_name: pc.UPDATE_STS, description: "Unknown" },
    { permission_name: pc.DELETE_STS, description: "Unknown" },

    { permission_name: pc.ADD_MANAGER_TO_STS, description: "Unknown" },
    { permission_name: pc.REMOVE_MANAGER_FROM_STS, description: "Unknown" },

    // vehicle-departure
    { permission_name: pc.CREATE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: pc.FIND_ALL_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: pc.FIND_ONE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: pc.UPDATE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: pc.DELETE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },

    // landfill
    { permission_name: pc.CREATE_LANDFILL, description: "Unknown" },
    { permission_name: pc.FIND_ALL_LANDFILL, description: "Unknown" },
    { permission_name: pc.FIND_ONE_LANDFILL, description: "Unknown" },
    { permission_name: pc.UPDATE_LANDFILL, description: "Unknown" },
    { permission_name: pc.DELETE_LANDFILL, description: "Unknown" },

    { permission_name: pc.ADD_MANAGER_TO_LANDFILL, description: "Unknown" },
    { permission_name: pc.REMOVE_MANAGER_FROM_LANDFILL, description: "Unknown" },

    // truck-dumping
    { permission_name: pc.CREATE_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: pc.FIND_ALL_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: pc.FIND_ONE_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: pc.UPDATE_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: pc.DELETE_TRUCK_DUMPING_ENTRY, description: "Unknown" },

    // billing
    { permission_name: pc.GENERATE_BILL_FOR_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: pc.FIND_ALL_BILL, description: "Unknown" },
];
