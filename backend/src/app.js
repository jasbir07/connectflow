const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/health.routes");
const applicationRoutes = require("./routes/application.routes");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/applications", applicationRoutes);
module.exports = app;