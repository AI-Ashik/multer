const { default: mongoose } = require("mongoose");

const authSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const authModel = mongoose.model("hashingFunction", authSchema);
module.exports = authModel;
