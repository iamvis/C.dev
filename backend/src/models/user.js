const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "email must  have at lease 6 char "],
      maxLength: [50, "email must be under the 50 char "],
      lowercase: true,
      trim: true,
      //  validate(value){
      //    if(!validator.isEmail(value)){
      //     throw new Error("email is invalid")
      //    }
      //  }
      validate: {
        validator: validator.isEmail,
        message: "email is inavalid",
      },
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      minLength: [3, "must have at least 3 char"],
      maxLength: [20, "must have under 30 char"],
      lowercase: true,
      validate: {
        validator: (value) => /^[a-zA-Z0-9_]+$/.test(value),
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
    fullName: {
      firstName: {
        type: String,
        trim: true,
        minLength: [3, "must have at least 3 char"],
        maxLength: [20, "must have under 30 char"],
        lowercase: true,
        // required: true,
      },
      lastName: {
        type: String,
        trim: true,
        minLength: [3, "must have at least 3 char"],
        maxLength: [20, "must have under 30 char"],
        lowercase: true,
      },
    },
    password: {
      type: String,
      minLength: 6,
      trim: true,
      required: true,
      validate: {
        validator: validator.isStrongPassword,
        message: "Password should be strong",
      },
      maxLength: [200, "must have under 20 char"],
    },
    photoURL: {
      type: String,
      trim: true,
      validate: {
        validator: validator.isURL,
        message: "Please enter a valid image URL (.jpg, .png, .gif)",
      },
    },
    age: {
      type: Number,
      min: [18, "must be above 18"],
      max: [150, "must under 150"],
      trim: true,
    },
    height: {
      feet: {
        type: Number,
        min: [0, "Feet must be a positive number"],
        max: [9, "Feet must be less than 10"], // optional limit
      },
      inches: {
        type: Number,
        min: [0, "Inches must be >= 0"],
        max: [11, "Inches must be <= 11"],
      },
    },

    maritalStatus: {
      type: String,
      trim: true,
      enum: ["married", "single", "divorced", "widowed"],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: {
        type: String,
        trim: true,
        validate: {
          validator: (val) => /^[0-9]{5,6}$/.test(val), // adjust for country
          message: "Invalid postal code",
        },
      },
      country: { type: String, trim: true, default: "India" }, // or your default
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
      trim: true,
    },
    dob: {
      type: Date,
      trim: true,
      validate: {
        validator: (value) => isAdult(18, value),
        message: "date of Birth can not be future",
      },
    },
    // timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
