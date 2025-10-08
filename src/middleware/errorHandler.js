module.exports = (err, res) => {
  console.error(" Error:", err.message);
  res.status(500).json({
    status: 0,
    message: "Internal Server Error",
    error: err.message,
  });
};
