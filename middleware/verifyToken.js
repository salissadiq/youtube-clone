import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).send("You're not authenticated!")

    jwt.verify(token, 'bug_bounty', (err, user)=> {
        if(err) return res.status(403).send("Token is invalid")
        req.user = user
        next()
    })
}