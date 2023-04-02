require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("./utils/apiResponse.utils");
const { HttpExceptionNotFound } = require("./exceptions/httpExceptions");
const routes = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler.middleware");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.get("/", (req, res, next) => {
  res.status(200).json(apiResponse(status.OK, "OK", "Welcome to auth api"));
});

app.use((req, res) => {
  throw new HttpExceptionNotFound(
    "Could not find that request from our resource"
  );
});

app.use(errorHandler);

app.use((err, req, res, next) =>
  res
    .status(status.INTERNAL_SERVER_ERROR)
    .json(
      apiResponse(
        status.INTERNAL_SERVER_ERROR,
        "INTERNAL_SERVER_ERROR",
        err.message
      )
    )
);

app.listen(port, () => console.info(`Listening on port ${port}`));
