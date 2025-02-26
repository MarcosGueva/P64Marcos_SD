const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Acceso denegado" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token inválido" });
    }
};
