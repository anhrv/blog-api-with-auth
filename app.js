const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();

// Global middlewares

// set security HTTP headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// body parser
app.use(express.json({ limit: "10kb" }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

// error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
