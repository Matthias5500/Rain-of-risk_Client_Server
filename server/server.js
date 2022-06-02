const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

  app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });
 
//Connect to MongoDB
app.listen(port, () => {
  //perform a database connection when server starts
  dbo.connectToServer(function (err) {
    // if error, print it out
    if (err) console.error(err);

  });
  // if no error, print success message
  console.log(`Server is running on port: ${port}`);
});

