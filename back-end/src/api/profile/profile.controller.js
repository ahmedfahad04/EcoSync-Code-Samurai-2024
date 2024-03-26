import usersService from "../users/users.service.js";

async function getProfile(req, res) {
    const { sub } = req.user;
    const user = await usersService.findOne(sub);
    res.status(200).json(user);
}

async function updateProfile(req, res) {
    const { sub } = req.user;
    const userDto = req.body;

    await usersService.update(sub, userDto);

    return res.status(200).json({ message: "profile updated successfully" });
}

export default {
    getProfile,
    updateProfile,
};
