const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth=async (req, res, next)=>{
try {//read the toekn from the reqest
    
const {token} =req.cookies
// console.log(token)
if(!token){
    throw new Error("invalid credential");
}
//validate the token
const decodeToken = jwt.verify(token, "iosdencfonbsdcojsdc-osocsoksco9sdcssiccsicscs" )
const {_id}= decodeToken;
// find the user
const user = await User.findById({_id});
if(!user){
    throw new Error("invalid credential")
}
console.log(user)
req.user = user
next();
    
} catch (error) {
    res.status(400).send("something went wrong", error.message)
}
}
module.exports = {
    userAuth
}