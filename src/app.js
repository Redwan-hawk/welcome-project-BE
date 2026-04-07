const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/userRoute");
const inventoryRoutes = require("./routes/inventoryRoute");
const categoryRoutes = require("./routes/categoryRoute");
const supplierRoutes = require("./routes/supplierRoute");
const dashboardController = require('../src/controllers/dashboardController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  console.log("[Route Hit] /health");
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Logistics WebApp API is running!" });
});

app.get("/dashboard/stats", dashboardController.getDashboardStats);

app.use("/users", userRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/categories", categoryRoutes);
app.use("/suppliers", supplierRoutes);

module.exports = app;
