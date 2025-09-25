const express = require("express");
const User = require("../models/user");
const { signupValidator, signinValidator } = require("../utils/validator");
const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    // //validation
    signupValidator(req);

    //destructuring
    const { email, password, firstName, lastName, username } = req.body;
    console.log(email);

    // and save hashed password
    const user = await User.findOne({ email });
    if (!user) {
      const user = new User({
        email,
        password,
        fullName: {
          firstName,
          lastName,
        },
        username,
      });
      //hash the password
      const hashedPassword = await user.getPasswordHashed();
      console.log(hashedPassword);
      user.password = hashedPassword;
      console.log(user);

      await user.save();
      res.status(201).send(`user creaed SuccessFully ${user}`);
    } else {
      throw new Error("Invalid Creation");
    }
  } catch (e) {
    res.status(400).send(`Error in User Creation  ${e.message}`);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    //validation

    signinValidator(req);
    const { email, password } = req.body;

    //find email in db
    const user = await User.findOne({ email });

    //if yes
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //campare hash password
    const isValidPassword = await user.getComparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Credential");
    }

    //token gena
    // const token = jwt.sign(
    //   { _id: user._id },
    //   "iosdencfonbsdcojsdc-osocsoksco9sdcssiccsicscs"
    // );
    const token = await user.getJWT();

    ///cokkies send
    console.log(token);
    res.cookie("token", token);

    //send response
    res.status(200).send(`user is logged in Succesfully`);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports= authRouter