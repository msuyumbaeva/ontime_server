const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'sanjaralmaz');
        if(decoded.role == 'Админ')
        {
            req.userData = decoded;
            next();
        }
        else
            return res.status(403).json({
                message: 'Отказ в доступе'
            });
    } catch (error) {
        return res.status(401).json({
            message: 'Пользователь не авторизован'
        });
    }
};