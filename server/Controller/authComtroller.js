const jwt = require('jsonwebtoken')
const User = require("../modules/user")
const bcrypt = require('bcrypt')


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' })

    //בדיקה אם קיים כזה משתמש
    const foundUser = await User.findOne({ email }).lean()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'משתמש לא מורשה' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'מייל או סיסמא שגויים' })

    const userInfo = {
        id: foundUser._id, name: foundUser.name,
        roles: foundUser.roles, email: foundUser.email
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken })
}

const register = async (req, res) => {  
    const {name,  phone, email, password} = req.body
    if (!name || !email || !phone || !password)
        return res.status(400).json({ message: 'All fields are required' })
    
    const duplicate = await User.findOne({ email: email }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "This is a duplicate username" })
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, phone, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({
            message: `New user ${user.name}
    created` })
    }
    else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}


module.exports = register 