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
        ],
    },
];
