const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

const port = 5000;

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    res.status(201).send(`user creaed SuccessFully ${user}`);
  } catch (e) {
    res.status(400).send(`Error in User Creation  ${e.message}`);
  }
});

app.get("/feed", async(req, res)=>{
  const email= req.body.email;
  if(!email){
    res.status(400).send("invalid email");
  }
  try{
     const user=  await User.findOne({email});
     if(user){
          res.status(200).send(`user found \n ${user}`);
     }
     res.status(400).send("user not found")
     
  

  }
  catch(e){
    res.status(400).send(`Something went wrong \n ${e.message}`)

  }
})

connectDB()
  .then(() => {
    console.log("connection is Established to the DATABASE");
    app.listen(port, () => {
      console.log(`App is running on port ${port}   http://localhost:5000/`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
