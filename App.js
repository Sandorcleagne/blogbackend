const express = require("express");
require("dotenv").config();
const connectDb = require("./config/connection");
const blogRouter = require("./routes/blogRoutes");
const registerdUserRoute = require("./routes/UserRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
connectDb();
app.use(express.json());
app.use(cors());
app.use(blogRouter, registerdUserRoute);

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
