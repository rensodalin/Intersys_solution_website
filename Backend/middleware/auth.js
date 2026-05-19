// Middleware to protect routes that require authentication
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: "Access denied. Please log in first."
    });
};
