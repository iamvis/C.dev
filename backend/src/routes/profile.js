const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const profileRoute = express.Router();

///profile api
profileRoute.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(`user data succesfully fetched: ${user}`);
  } catch (error) {
    res.status(400).send("something went wrong", error.message);
  }
});

module.exports= profileRoute