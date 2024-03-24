import utils from "../utils/utils.js";
import config from "../configs/config.js";
import usersRepository from "../api/users/users.repository.js";

async function checkRefreshToken(req, res, next) {
    try {
        const refreshToken = req.signedCookies[config.cookie.refreshToken];

        const decodedToken = utils.verifyJwtToken(refreshToken);

        if (!decodedToken) {
            return res.status(401).json({ message: "authentication failed" });
        }

        const user = await usersRepository.findOneById(decodedToken.user_id);
        delete user.password;

        const accessToken = utils.generateJwtToken(
            {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            },
            config.jwt.accessTokenExpiry
        );

        res.cookie(config.cookie.accessToken, accessToken, {
            httpOnly: true,
            maxAge: config.jwt.expiry,
            signed: true,
        });

        req.user = user;

        next();
    } catch (error) {
        console.log(err);
        res.status(500).send({ message: "an error occurred while authenticating" });
    }
}

export async function checkAuthentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        const authToken = bearerToken ? bearerToken.split(" ")[1] : null;
        const signedCookie = req.signedCookies[config.cookie.accessToken];

        const accessToken = signedCookie || authToken;

        const decodedToken = utils.verifyJwtToken(accessToken);

        if (!decodedToken) {
            // return checkRefreshToken(req, res, next);
            return res.status(401).json({ message: "authentication failed" });
        }

        // do something here if roles are updated for that user

        req.user = decodedToken;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "an error occurred while authenticating" });
    }
}

export async function isAdmin(req, res, next) {
    const user = req.user;
    if (user.roles.includes("admin")) {
        next();
    } else {
        return res.status(403).json(GenericResponse.error("you are not allowed"));
    }
}
