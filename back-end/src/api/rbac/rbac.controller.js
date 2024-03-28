async function assignPermissionsToRole(req, res) {
    const { role_id } = req.params;
    const permission_names = req.body;

    console.log(role_id, permission_names);

    res.json({ message: "permission assigned successfully" });
}

export default {
    assignPermissionsToRole,
};
