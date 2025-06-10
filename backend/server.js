const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes") // import user routes
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/users", userRoutes); // middleware route
app.use("/api/tasks", taskRoutes);

// MongoDB Connect & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("MongoDB Connected");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT} `);
});
