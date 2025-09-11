const validator = require("validator");

const signupValidator = (req) => {
  const { email, password } = req.body;

  // Check if values exist
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Validate strong password
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 chars long and include lowercase, uppercase, number, and symbol"
    );
  }

  return true; // ✅ If everything is valid
};
const signinValidator = (req) => {
  const { email, password } = req.body;

  // Check if values exist
  if (!email || !password) {
    throw new Error("Email and password are required");
  }


//   // Validate strong password
//   if (
//     !validator.isStrongPassword(password, {
//       minLength: 8,
//       minLowercase: 1,
//       minUppercase: 1,
//       minNumbers: 1,
//       minSymbols: 1,
//     })
//   ) {
//     throw new Error(
//       "Password must be at least 8 chars long and include lowercase, uppercase, number, and symbol"
//     );
//   }

  return true; // ✅ If everything is valid
};

module.exports = {
  signupValidator,
  signinValidator
};
