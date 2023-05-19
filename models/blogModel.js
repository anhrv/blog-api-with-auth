const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog name is required!"],
  },
  body: {
    type: String,
    required: [true, "Blog body is required!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
