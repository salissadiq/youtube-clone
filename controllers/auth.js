import User, {validatUser, signInUserValidation} from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { tryCatchMiddleware } from '../middleware/tryCatch.js'

export const signup =  tryCatchMiddleware(async(req, res)=> {
        //User input validation with joi
        //The validateUser function is declared in User.js model in models folder and impoted here
        const {error} = validatUser(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        //Perform a check in the database for user email duplication
        // return status code of 400 if the email exist in the database
        const user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).send("Email already exist")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({...req.body, password: hashedPassword})
        await newUser.save()
        res.status(200).send("Account has been created")
        next(createError(500, 'Something went wrong!'))
})

export const signin = tryCatchMiddleware(async(req, res)=> {
    const {error} = signInUserValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email})
    if(!user) return res.status(404).send("Account not found")

    const passwordMatched = await bcrypt.compare(req.body.password, user.password)
    if(!passwordMatched) return res.status(401).send("Wrong password!")
    const {password, ...others} = user._doc
    const token = jwt.sign({id: user._id}, 'bug_bounty')
    res.cookie("access_token", token,{httpOnly: true}).status(200).send(others)

})
