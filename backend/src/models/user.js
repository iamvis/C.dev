const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  username: {
    type: String,
    unique: true,
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String
    }
  },
  password: {
    type: String,
    minlength: 6
  },
  age: {
    type: Number,
    min: 0
  },
  height: {
    feet: {
      type: Number,
    },
    inches: {
      type: Number,
    }
  },
  maritalStatus: {
    type: String,
    enum: ["married", "single", "divorced", "widowed"]
  },
  address: {
    type: String
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  },
  dob: {
    type: Date
  }
    // timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model("User", userSchema);
