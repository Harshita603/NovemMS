const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
connectDB();
const app = express();



// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/email", emailRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        status: 1,
        message: 'Welcome to the Email Verification API!'
    });
});

// Global Error Handler
// app.use(errorHandler);


module.exports = app;
