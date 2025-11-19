const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    // בדיקה שקיבלנו הידאר ושהוא מתחיל ב-בירר
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {

        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    // לבדוק
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, userInfo) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            console.log(userInfo);
            req.user = userInfo
            next()
        })
}



module.exports = verifyJWT