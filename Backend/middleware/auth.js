export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: "Access denied. Please log in first."
    });
};

export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({ success: false, error: "Access denied. Admin authorization required." });
};
