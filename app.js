const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require('./db/connect')
require('dotenv').config()
const port = 8080;

app.use(express.json());
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log("running on port 8080");
    });
  } catch (error) {
    console.log(error);
  }
};

start()