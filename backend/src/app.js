const express = require("express");
const app = express();

const port = 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}   http://localhost:5000/`);
});
