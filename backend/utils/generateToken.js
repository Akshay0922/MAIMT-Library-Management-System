const jwt=require("jsonwebtoken")
const generateToken=(user)=>{
    return jwt.sign({id:user._id,role:user.role,name:user.userName},process.env.JWT_SECRET,{expiresIn:"1h"})
}
module.exports=generateToken;