import { permissionConstants as pc } from "../constants/permissions.constants.js";
import { roleConstants as rc } from "../constants/roles.constants.js";

const rolePermissionData = [
    {
        role_name: [rc.SystemAdmin],
        permission_names: [
            // role
            pc.CREATE_ROLE,
            pc.FIND_ALL_ROLE,
            pc.FIND_ALL_ROLE,
            pc.UPDATE_ROLE,
            pc.DELETE_ROLE,
            pc.ADD_PERMISSION_TO_ROLE,
            pc.REMOVE_PERMISSION_FROM_ROLE,
            pc.FIND_ALL_PERMISSION_OF_ROLE,

            // permissions
            pc.FIND_ALL_PERMISSION,
            pc.FIND_ONE_PERMISSION,

            // user
            pc.CREATE_USER,
            pc.FIND_ALL_USER,
            pc.FIND_ONE_USER,
            pc.UPDATE_USER,
            pc.DELETE_USER,

            pc.ADD_ROLE_TO_USER,
            pc.REMOVE_ROLE_FROM_USER,

            // vehicle
            pc.CREATE_VEHICLE,
            pc.FIND_ALL_VEHICLE,
            pc.FIND_ONE_VEHICLE,
            pc.UPDATE_VEHICLE,
            pc.DELETE_VEHICLE,

            pc.ADD_DRIVER_TO_VEHICLE,

            // sts
            pc.CREATE_STS,
            pc.FIND_ALL_STS,
            pc.FIND_ONE_STS,
            pc.UPDATE_STS,
            pc.DELETE_STS,

            pc.ADD_MANAGER_TO_STS,
            pc.REMOVE_MANAGER_FROM_STS,

            pc.FIND_ALL_VEHICLE_DEPARTURE_ENTRY,
            pc.FIND_ONE_VEHICLE_DEPARTURE_ENTRY,

            // landfill
            pc.CREATE_LANDFILL,
            pc.FIND_ALL_LANDFILL,
            pc.FIND_ONE_LANDFILL,
            pc.UPDATE_LANDFILL,
            pc.DELETE_LANDFILL,

            pc.ADD_MANAGER_TO_LANDFILL,
            pc.REMOVE_MANAGER_FROM_LANDFILL,
            
            pc.FIND_ALL_TRUCK_DUMPING_ENTRY,
            pc.FIND_ONE_TRUCK_DUMPING_ENTRY,

            // 
        ],
    },
];
