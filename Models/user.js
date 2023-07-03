const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => {
    console.log("Oh No Mongo Connection Error!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { _id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const user = new User({
    first: "Harry",
    last: "Potter",
  });

  user.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });

  const res = await user.save();

  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });

  const res = await user.save();

  console.log("Add Address Res : ", res);
};

addAddress("64a35cb9750f65a21a78fc66");
