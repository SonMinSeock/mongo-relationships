const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => {
    console.log("Oh No Mongo Connection Error!");
    console.log(err);
  });

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
  //   const user = new User({ username: "son123", age: 24 });
  const user = await User.findOne({ username: "son123" });
  //   const firstTweet = new Tweet({ text: "너의 MBTI는?", likes: 10 });
  const secondTweet = new Tweet({ text: "앨리멘탈 후기!", likes: 23 });
  //firstTweet.user = user;
  secondTweet.user = user;
  user.save();
  secondTweet.save();
};

const findTweet = async () => {
  //   const tweet = await Tweet.findOne({}).populate("user", "username");
  const tweets = await Tweet.find({}).populate("user");
  console.log(tweets);
};

//makeTweets();
findTweet();
