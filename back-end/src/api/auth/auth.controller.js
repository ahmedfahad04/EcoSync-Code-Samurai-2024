import { config } from "../../configs/config.js";
import authService from "./auth.service.js";

async function signup(req, res) {
    const signUpDto = req.body;

    const user = await authService.signup(signUpDto);

    res.status(201).json(user);
}

async function login(req, res) {
    const loginDto = req.body;

    const { accessToken, user } = await authService.login(loginDto.email, loginDto.password);

    res.cookie(config.cookie.accessToken, accessToken, {
        httpOnly: true,
        maxAge: config.jwt.accessTokenExpiry,
        signed: true,
    });

    res.json({ accessToken, user });
}

async function logout(req, res) {
    res.clearCookie(config.cookie.accessToken);
    res.json({ message: "logged out successfully" });
}

async function initiateResetPassword(req, res) {
    const { email } = req.body;

    await authService.initiateResetPassword(email);
    res.json({ message: "An OTP is send to your email. Check mailbox." });
}

async function confirmResetPassword(req, res) {
    const dto = req.body;
    await authService.confirmResetPassword(dto.email, dto.otp, dto.password);
    res.json({ message: "Password changed successfully" });
}

export default { login, logout, signup, initiateResetPassword, confirmResetPassword };
