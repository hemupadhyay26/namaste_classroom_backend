const mongoose = require("../db/conn");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  phoneNo: { type: Number },
  address: { type: String },
  gender: { type: String },
  profile: { type: String },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

const User = (module.exports = mongoose.model("User", userSchema));
