const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const requestRoute = express.Router();

//sendRequest api
requestRoute.post("/sendRequest", userAuth, async (req, res) => {
  res.status(200).send(`${req.user.fullName.firstName}  sends u request`);
});

module.exports= requestRoute