const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 MongoDB connection (IMPORTANT: use service name "mongo")
mongoose.connect("mongodb+srv://sachintha:Sachin%401234@cluster0.n9fgbpl.mongodb.net/?appName=Cluster0", {
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// ✏️ UPDATE user
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,   // id from URL
      req.body,        // new data
      { new: true }    // return updated data
    );

    res.send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE
app.put("/user/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(updatedUser);
});

// DELETE
app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

// 📦 Model
const Item = mongoose.model("Item", {
  name: String,
});

// ➕ POST API
app.post("/add", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

// 📥 GET API
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// 🚀 Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
