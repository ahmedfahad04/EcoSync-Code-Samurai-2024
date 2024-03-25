export const notFoundHandler = (req, res, next) => {
    console.log(req.url);
    res.status(404).json({ message: "not found" });
};
