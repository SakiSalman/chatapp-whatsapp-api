
import jwt from 'jsonwebtoken'


/**
 * Generate Access Token
 * @param {*} payload 
 * @param {*} exp 
 * @returns 
 */

export const createToken = (payload, exp="1d") => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: exp });

    return token
}

/**
 * verify access token
 * @param {*} token 
 * @returns 
 */
export const verifyToken = (token) => {
    let tokenVerify = null
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          console.log(err);
           return tokenVerify = null 
        }else{
          return  tokenVerify = decoded
        }
      });

      return tokenVerify

}