import utils from "../utils/utils.js";
import { config } from "../configs/config.js";
import usersRepository from "../api/users/users.repository.js";

export async function checkAuthentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        const authToken = bearerToken ? bearerToken.split(" ")[1] : null;
        const signedCookie = req.signedCookies[config.cookie.accessToken];

        const accessToken = signedCookie || authToken;

        const decodedToken = utils.verifyJwtToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ message: "authentication failed" });
        }

        req.user = decodedToken;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "an error occurred while authenticating" });
    }
}

export async function checkPermission(permission) {
    // return midleware
}
