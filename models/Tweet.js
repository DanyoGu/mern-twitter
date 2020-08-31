const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  //props
  //define what it means to be a tweet
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' //name of model to associate with
  },
  text: {
      type: String,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now
  },
});

Tweet = mongoose.model("tweet", TweetSchema);
module.exports = Tweet;
