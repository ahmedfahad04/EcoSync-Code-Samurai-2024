import config from "../../configs/config.js";
import authService from "./auth.service.js";

async function login(req, res) {
    const loginDto = req.body;

    const { accessToken, user } = await authService.login(loginDto.email, loginDto.password);

    res.cookie(config.cookie.accessToken, accessToken, {
        httpOnly: true,
        maxAge: config.jwt.accessTokenExpiry,
        signed: true,
    });

    res.json({
        message: "logged in successfully",
        token: accessToken,
        user,
    });
}

async function logout(req, res) {
    res.clearCookie(config.cookie.accessToken);
    res.json({ message: "logged out successfully" });
}

async function signup(req, res) {
    const signUpDto = req.body;

    const { user } = await authService.signup(signUpDto);

    res.status(201).json(user);
}

export default { login, logout, signup };
