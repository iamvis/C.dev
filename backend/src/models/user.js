const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  // username: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  // fullName: {
  //   firstName: {
  //     type: String,
  //     required: true
  //   },
  //   lastName: {
  //     type: String
  //   }
  // },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
//   age: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   height: {
//     feet: {
//       type: Number,
//       required: true
//     },
//     inches: {
//       type: Number,
//       required: true
//     }
//   },
//   maritalStatus: {
//     type: String,
//     enum: ["married", "single", "divorced", "widowed"],
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["online", "offline"],
//     default: "offline"
//   },
//   dob: {
//     type: Date,
//     required: true
//   }
// , { timestamps: true }
});

module.exports = mongoose.model("User", userSchema);
