const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidator, signinValidator } = require("./utils/validator");
const bcrypt = require("bcrypt");
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("Incoming content-type:", req.headers["content-type"]);
//   next();
// });

////**********************  NEVER TRUST THER USER REQUEST  ***************************** */

app.post("/signup", async (req, res) => {
  try {
    // //validation
    signupValidator(req);

    //destructuring
    const { email, password, firstName, lastName } = req.body;
    console.log(email);

    // and save hashed password
    const user = await User.findOne({ email });
    if (!user) {
      //hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = new User({
        email,
        password: hashedPassword,
       fullName:{
         firstName,
         lastName,
       }
      });

      console.log(user);
      await user.save();
      res.status(201).send(`user creaed SuccessFully ${user}`);
    }
     else{
      throw new Error("Invalid Creation")
     }

  } catch (e) {
    res.status(400).send(`Error in User Creation  ${e.message}`);
  }
});

app.post("/login", async(req, res)=>{
 try{
  //validation
   signinValidator(req);
    const {email, password}= req.body;
    
   //find email in db
   const user = await User.findOne({email});
   
  //if yes
    if(!user){throw new Error("Invalid Credentials")}
          //campare hash password
   const isValidPassword = await bcrypt.compare(password, user.password);
   if(!isValidPassword){
    throw new Error("Invalid Credential")
   }

  //send response
  res.status(200).send(`user is logged in Succesfully`)
    

 }
 catch(error){
   res.status(400).send("Error : "+error.message)
 }

})

app.get("/feed", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).send("invalid email");
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).send(`user found \n ${user}`);
    }
    res.status(400).send("user not found");
  } catch (e) {
    res.status(400).send(`Something went wrong \n ${e.message}`);
  }
});

//deleteb api
app.delete("/delete", async (req, res) => {
  const userId = req.body.userid;
  if (!userId) {
    res.status(400).send("userId not found");
  }
  try {
    console.log(req.body);
    const user = await User.findOneAndDelete({ _id: userId });
    if (user) {
      res.status(200).send("user is succesfuly deleted");
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    res.status(400).send("Something went Wrong", e.message);
  }
});

//put api
app.put("/update", async (req, res) => {
  console.log("Raw body:", req.body); // Debugging
  const userid = req.body.userid;
  console.log(userid);
  const data = req.body;

  if (!data) {
    res.status(400).send("user id  not found");
  }
  try {
    const update = await User.findByIdAndUpdate({ _id: userid }, data, {
      new: true,
      overwrite: true,
    });
    if (update) {
      res.status(200).send("user is fully upadate by put  mehod");
    } else {
      res.status(400).send("use updation feild");
    }
  } catch {
    res.status(400).send("something went wrong ", e.message);
  }
});
//patch api
app.patch("/update-patch/:id", async (req, res) => {
  // console.log("Raw body:", req.body); // Debugging
  const userid = req.params?.id;
  console.log(userid);
  const data = req.body;

  if (!data) {
    res.status(400).send("user id  not found");
  }
  try {
    if (req.body.email) {
      throw new Error("Email can not be changed");
    }
    const update = await User.findByIdAndUpdate({ _id: userid }, data, {
      new: true,
      overwrite: true,
    });
    if (update) {
      res.status(200).send("user is fully upadate by patch  mehod");
    } else {
      res.status(400).send("use updation feild");
    }
  } catch (e) {
    res.status(400).send("Error", e.message);
  }
});

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
