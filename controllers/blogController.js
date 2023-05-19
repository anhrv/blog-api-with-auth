const Blog = require("../models/blogModel");
const factory = require("../utils/handlerFactory");
const catchError = require("../utils/catchError");
const AppError = require("../utils/appError");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog);
exports.createBlog = factory.createOne(Blog);

exports.updateBlog = catchError(async (req, res, next) => {
  const doc = await Blog.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (!doc.user._id.equals(req.user._id) && req.user.role === "user") {
    return next(new AppError("You can't update this document", 401));
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.deleteBlog = catchError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("No document found with that ID", 404));
  }

  console.log(req.user, blog.user);

  if (!blog.user._id.equals(req.user._id) && req.user.role === "user") {
    return next(new AppError("You can't delete this document", 401));
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
