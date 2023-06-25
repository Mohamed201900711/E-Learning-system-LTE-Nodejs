
import jwt from 'jsonwebtoken'


export const auth = (req, res, next) => {
    let token = req.header('token')
    let userRole = req.header('userRole')
    jwt.verify(token, process.env.JWT_KEY , function (err, decoded) {
        if (err) {
            res.json({ err })
        } else {
            req.user = decoded
            req.role=userRole
            next()
        }
    });
}
