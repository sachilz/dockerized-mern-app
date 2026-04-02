const mongoose = require("mongoose");

// 🧩 Schema (structure of data)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// 📦 Model (collection)
const User = mongoose.model("User", userSchema);

module.exports = User;