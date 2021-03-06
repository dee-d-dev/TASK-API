const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewares/notFound");
const errorHandlerMW = require("./middlewares/error-handler");

app.use(express.json());
app.use(express.static("./views"));

//routes
app.use("/api/v1/tasks", tasks);

// app.get("/api/v1/home", (req, res) =>{
//   res.send("Home")
// })

app.use(notFound);
app.use(errorHandlerMW);

const port = process.env.PORT;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  try {
    app.listen(port, () => {
      console.log(`running on port ${port}`);
    });
  } catch (error) {
    console.log({ msg: error });
  }
};

start();
