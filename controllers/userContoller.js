import { AccountActivationEmail } from "../email/accountActivationEmail.js";
import User from "../models/userModel.js";
import { checkPasswod, hasPassword } from "../utility/bcrypt.js";
import createError from "../utility/createErroe.js";
import { convertDashToDot, convertDotToDash } from "../utility/helper.js";
import { createToken, verifyToken } from "../utility/jwt.js";
import { verificationCode } from "../utility/math.js";
import { createUsername, validateEmail } from "../utility/validator.js";
import jwt from 'jsonwebtoken'



export const getAllUsers = async (req, res, next) => {
    try {
        const {token} = req.params
    
        const convetedToken = token
        const verifiedToken = verifyToken(convetedToken)
        if (!verifiedToken?.email) {
            return next(createError(400, "You Are Not Authenticated!"))
        }
        const matchedUser = await User.findOne({email : verifiedToken.email})
        if (!matchedUser) {
            return next(createError(400, "You Are Unauthenticated!"))
        }
        const allUser = await User.find({isActivate : true,_id: { $ne: matchedUser._id }}).select(["username", "name"]).exec();
        res.status(200).json({
            statusCode : 200,
            data : allUser
        })
    } catch (error) {
       return next(createError(400, "Server Error!"))
    }
};


export const registerUser = async (req, res, next) => {
    const {name, password, email} = req.body

    if (!name || !password || !email) {
        return next(createError(400, "Any of field can not be empty"))
    }
    const emailValid = validateEmail(email)
    if (!emailValid){
        return next(createError(400, "Enter valid Email"))
    }
    const username = createUsername(name)

    const gotUser = await User.findOne({
        "email" : email
    })
    if (gotUser) {
       return next(createError(401, "User Already Created. try another email!")) 
    }
    const passwordHased = await hasPassword(password)
    const generatedToken = createToken({email})
    const activationLink = process.env.APP_URL+"/activation/"+convertDotToDash(generatedToken)
    const verifyCode = verificationCode()
   const user = await User.create(
    {
        ...req.body,
        username,
        password : passwordHased,
        token : generatedToken,
        accessToken : verifyCode
    }
);
    if (!user) {
        return next(createError(400, "Please Enter All info And Try Again."))
    }
    console.log(activationLink);
    // AccountActivationEmail(email,{link : activationLink, code:verifyCode} )
    res.status(200).json({
        statusCode : 200,
        data : user,
        message : "User Created Successfully!"
    })
};

export const activateAccount = async (req, res, next) => {
   try {
    const {token}  = req.params
    if (!token) {
       return next(createError(404, "Invalid Token!")) 
    }
    const verifiedToken = verifyToken(convertDashToDot(token))
    if (!verifiedToken || verifiedToken.email == "undefined" || verifiedToken.email == null) {
        return next(createError(404, "Invalid Token!")) 
    }
    let {email} = verifiedToken
    let user = await User.findOne({email})
    if (!user) {
        return next(createError(404, "Invalid Token!")) 
    }
    if (user.isActivate == true) {
        return next(404, "User Already Activated. Please Login!")
    }
    const updateUser = await User.findByIdAndUpdate(user._id, {accessToken : null, isActivate : true})
    res.status(200).json({
        message : "User Activation Success!",
        statusCode : 200
    })
   } catch (error) {
    res.status(404).json({
        message : null,
        statusCode : 404
    })
   }
}
export const activateAccountByCode = async (req, res, next) => {
   try {
    const {code, email}  = req.body
    if (!email) {
        return next(createError(404, "Invalid Email!")) 
    }
    let user = await User.findOne({email})
    if (!user) {
        return next(createError(404, "Invalid Email or Code!")) 
    }
    if (user.isActivate == true) {
        return next(404, "User Already Activated. Please Login!")
    }
    if (user.accessToken != code) {
        return next(404, "Oh-no! Wrong verification Code.")
    }
    const updateUser = await User.findByIdAndUpdate(user._id, {accessToken : null, isActivate : true})

    res.status(200).json({
        user : updateUser,
        statusCode : 200
    })
   } catch (error) {
    res.status(200).json({
        user : null,
        statusCode : 404
    })
   }
}


export const loginuser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return next(createError(400, "Any of field can not be empty"))
        }

        const user = await User.findOne({email})
        if (!user) {
            return next(createError(400, "No User Found! Please Register!"))
        }
        const checkedPasswod = await checkPasswod(password, user.password)
        if (!checkedPasswod) {
            return next(createError(400, "Wrong Password!"))
        }
        const newToken = createToken({email, password})        
        const updateUser = await User.findByIdAndUpdate(user._id, {token : newToken}).select(["-password", "-isActivate", "-accessToken"])
        res.status(200).json({
            user : updateUser,
            message : "Login Success!",
            statusCode : 200
        })

    } catch (error) {
        res.status(404).json({
            message : null,
            statusCode : 404
        })
    }
}


/**
 * Get Specific User
 */

export const getUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")?.[1]
        console.log(token);
        if (!token) {
        return next(createError(404, "User Not Authenticate. PLease Login!"))
        }
        const verifiedToken = verifyToken(token)
        if (!verifiedToken) {
            return next(createError(404, "User Not Authenticate. PLease Login!"))
        }
        const user = await User.findOne({email : verifiedToken.email, isActivate : true}).select(["-password", "-isActivate", "-accessToken"])
        if (!user) {
            return next(createError(404, "User Not Authenticate. PLease Login!"))
        }
        res.status(200).json({
            user : user,
            statusCode : 200
        })
    } catch (error) {
        next(createError(404, "Server Error!"))
    }
}
