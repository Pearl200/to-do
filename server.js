const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html as the default file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
