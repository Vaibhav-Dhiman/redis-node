require("dotenv").config();
const express = require("express");
const app = express();

const todoRoute = require("./routes/todos");
app.use(express.json());

app.use("/api/todo", todoRoute);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
