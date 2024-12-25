const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS to allow requests from your frontend
app.use(cors());

const corsOptions = {
  origin: "https://aishwaryashree24.github.io/weather-app/", // Replace with your actual GitHub Pages URL
};
app.use(cors(corsOptions));


// Handle weather requests
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  // Fetch weather data using OpenWeatherMap API
  const apiKey = process.env.API_KEY; // Secure API key from environment variable
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
