const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Token not provided' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Adiciona o ID do usuário na requisição
        next();
       
    } catch (error) {
      
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;
