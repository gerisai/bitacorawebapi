const mongoose = require("mongoose");
const { LogSchema } = require("./log");

const UserSchema = new mongoose.Schema({
  numEmpl: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
      type: String,
      required: true,
      uppercase: true
  },
  password: {
      type: String,
      required: true
  },
  logs: [LogSchema]
});


UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await candidatePassword === userPassword;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;