const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type:Number
  }
});

userSchema.post("save", (doc) => {
  console.log("Doc saved:", doc._id);
});
const userModal = mongoose.model("USERRR", userSchema);

module.exports = userModal;
