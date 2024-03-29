import utils from "../utils/utils.js";
import { config } from "../configs/config.js";
import usersRepository from "../api/users/users.repository.js";
import { models } from "../configs/mysql.js";

export const checkAuthentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const authToken = bearerToken ? bearerToken.split(" ")[1] : null;
        const signedCookie = req.signedCookies[config.cookie.accessToken];

        const accessToken = signedCookie || authToken;

        const decodedToken = utils.verifyJwtToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ message: "authentication failed" });
        }

        const user = await usersRepository.findOneUserByIdWithRoles(decodedToken.sub);

        if (!user) {
            return res.status(401).json({ message: "authentication failed" });
        }

        const role = user.role;
        const permissions = await models.Permission.findAll({
            include: {
                model: models.Role,
                where: {
                    role_id: role.role_id,
                },
                through: {
                    model: models.RolePermission,
                    attributes: [],
                },
                attributes: [],
            },
        });
        const permission_names = [];
        for (const permission of permissions) {
            permission_names.push(permission.permission_name);
        }

        req.user = { ...decodedToken, role_name: role.role_name, permission_names: permission_names };

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "an error occurred while authenticating" });
    }
}

export const checkPermission = (permission) => {
    return [
        checkAuthentication,
        (req, res, next) => {
            if (!req.user) return res.status(401).send({ message: "Authentication failed" });

            const permission_names = req.user.permission_names;

            if (!permission_names.includes(permission)) {
                return res.status(403).json({ message: "you do not have permission to access this resource" });
            }

            return next();
        },
    ];
}
