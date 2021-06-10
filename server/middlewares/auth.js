const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) res.status(401).json({
            message: "Authorization Denied",
        });
        else{
            const payload = await jwt.verify(token, process.env.JWT_SECRET);
            req.payload = payload;
            next();
        }
    } catch (err) {
        res.status(403).json({
            error: true,
            message: "Token is not valid.",
        });
    }
};