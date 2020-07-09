const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();

//middleware
app.use(express.json()); //read json from express
app.use(cors()); //enable it

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));

//set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) throw err;
    console.log("mongodb connection established");

  }
);

//set up routes
app.use("/users", require("./routes/userRouter"));
