import { permissionConstants } from "../constants/permissions.constants.js";

export const permissionData = [
    // roles
    { permission_name: permissionConstants.CREATE_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_ROLE, description: "Unknown" },

    { permission_name: permissionConstants.ADD_PERMISSION_TO_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.REMOVE_PERMISSION_FROM_ROLE, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_PERMISSION_OF_ROLE, description: "Unknown" },

    // permissions
    { permission_name: permissionConstants.FIND_ALL_PERMISSION, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_PERMISSION, description: "Unknown" },

    // users
    { permission_name: permissionConstants.CREATE_USER, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_USER, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_USER, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_USER, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_USER, description: "Unknown" },

    { permission_name: permissionConstants.ADD_ROLE_TO_USER, description: "Unknown" },
    { permission_name: permissionConstants.REMOVE_ROLE_FROM_USER, description: "Unknown" },

    // profile
    { permission_name: permissionConstants.FIND_PROFILE, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_PROFILE, description: "Unknown" },

    // vehicles
    { permission_name: permissionConstants.CREATE_VEHICLE, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_VEHICLE, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_VEHICLE, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_VEHICLE, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_VEHICLE, description: "Unknown" },

    { permission_name: permissionConstants.ADD_DRIVER_TO_VEHICLE, description: "Unknown" },

    // sts
    { permission_name: permissionConstants.CREATE_STS, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_STS, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_STS, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_STS, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_STS, description: "Unknown" },

    { permission_name: permissionConstants.ADD_MANAGER_TO_STS, description: "Unknown" },
    { permission_name: permissionConstants.REMOVE_MANAGER_FROM_STS, description: "Unknown" },

    { permission_name: permissionConstants.CREATE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },

    // vehicle-departure
    { permission_name: permissionConstants.FIND_ALL_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_VEHICLE_DEPARTURE_ENTRY, description: "Unknown" },

    // landfill
    { permission_name: permissionConstants.CREATE_LANDFILL, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ALL_LANDFILL, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_LANDFILL, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_LANDFILL, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_LANDFILL, description: "Unknown" },

    { permission_name: permissionConstants.ADD_MANAGER_TO_LANDFILL, description: "Unknown" },
    { permission_name: permissionConstants.REMOVE_MANAGER_FROM_LANDFILL, description: "Unknown" },

    { permission_name: permissionConstants.CREATE_TRUCK_DUMPING_ENTRY, description: "Unknown" },

    // truck-dumping
    { permission_name: permissionConstants.FIND_ALL_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.FIND_ONE_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.UPDATE_TRUCK_DUMPING_ENTRY, description: "Unknown" },
    { permission_name: permissionConstants.DELETE_TRUCK_DUMPING_ENTRY, description: "Unknown" },

    { permission_name: permissionConstants.GENERATE_BILL_FOR_DUMPING_ENTRY, description: "Unknown" },
];
