const express = require("express");
const app = express();
const connectDB= require("./config/database");
const User = require("./models/user");

app.use(express.json())


const port = 5000;

app.post("/signup",async(req, res)=>{
  const userData= req.body;
  console.log(userData)
  const newUser= {
    email:userData.email,
    password:userData.password

  }
  try{
    const user=  new User(userData);
    await user.save();
    res.status(201).send(`user creaed SuccessFully ${user}`)
  }catch(e){
    res.status(400).send(`Error in User Creation  ${e.message}`)

  }
  

})

connectDB()
.then(()=>{ console.log("connection is Established to the DATABASE")
  app.listen(port, () => {
  console.log(`App is running on port ${port}   http://localhost:5000/`);
});
} )
.catch((e)=>{
  console.error(e)
})


