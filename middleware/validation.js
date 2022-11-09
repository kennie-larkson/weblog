const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function validateForm(req, res, next) {
  const {
    name,
    email,
    //phoneNumber,
    //countryCode,
    password,
    confirmPassword,
    //grade,
  } = req.body;
  if (
    !name ||
    !email ||
    //!phoneNumber ||
    //!countryCode ||
    !password ||
    !confirmPassword
    //!grade
  ) {
    console.log("Please enter missing fields");
    res.status(404).json({ message: "Please enter missing fields" });
    return;
  } else if (password != confirmPassword) {
    return res
      .status(404)
      .json({ status: false, message: "Your passwords do not match" });
  }
  next();
}

async function hashPassword(req, res, next) {
  const user = req.body;

  const hash = await bcrypt.hash(user.password, 8);
  user.password = hash;
  req.user = user;
  next();
}

module.exports = { validateForm, hashPassword };
