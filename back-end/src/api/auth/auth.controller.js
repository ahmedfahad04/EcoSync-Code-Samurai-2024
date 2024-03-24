import config from "../../configs/config.js";
import authService from "./auth.service.js";

async function login(req, res) {
    const loginDto = req.body;

    const { accessToken } = await authService.login(loginDto.email, loginDto.password);

    res.cookie(config.cookie.accessToken, accessToken, {
        httpOnly: true,
        maxAge: config.jwt.accessTokenExpiry,
        signed: true,
    });

    // set refresh token for long time??

    res.json({
        message: "logged in successfully",
        token: accessToken,
    });
}

async function logout(req, res) {
    res.clearCookie(config.cookie.accessToken);
    res.clearCookie(config.cookie.refreshToken);
    res.json({ message: "logged out successfully" });
}

async function signup(req, res) {
    const signUpDto = req.body;

    const { user } = await authService.signup(signUpDto);

    res.status(201).json(user);
}

export default { login, logout, signup };
