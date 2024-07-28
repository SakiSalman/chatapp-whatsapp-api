import { AccountActivationEmail } from "../email/accountActivationEmail.js";
import User from "../models/userModel.js";
import { hasPassword } from "../utility/bcrypt.js";
import createError from "../utility/createErroe.js";
import { createToken } from "../utility/jwt.js";
import { verificationCode } from "../utility/math.js";
import { createUsername, validateEmail } from "../utility/validator.js";

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
    const activationLink = process.env.SERVER_URL+"/activation/"+generatedToken
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
    AccountActivationEmail(email,{link : activationLink, code:verifyCode} )
    res.status(200).json({
        statusCode : 200,
        data : user,
        message : "User Created Successfully!"
    })
};
