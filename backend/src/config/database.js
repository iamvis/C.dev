const mongoose = require("mongoose");

const url = `mongodb+srv://prjapativishal82141:4z8v7xD4VPTdedr0@cluster0.0vyofuv.mongodb.net/connectDev`;

const DBconnect = async () => {
  console.log("trying to connect");
  await mongoose.connect(url);
  console.log("data base to connect ho jana chahiye");
};

module.exports = DBconnect;
