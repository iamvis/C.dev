 const userAuth= (req, res, next)=>{
    const token = "jnfsnn"
    if(token !=="jnfsnn"){
       res.status(404).send(Error, "user is in valid");
    }
    else{
        next();
    }
}
module.exports={userAuth};