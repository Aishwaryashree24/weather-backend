import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://aishwaryashree24.github.io/weather-app/", // Replace with your actual GitHub Pages URL
};
app.use(cors(corsOptions));


app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  // Fetch weather data using OpenWeatherMap API
  const apiKey = process.env.API_KEY; // Secure API key from environment variable
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //https://api.openweathermap.org/data/2.5/weather?q=London&appid=0e30f7cfa72aef3d4214d2be5951e4ef&units=metric
  try {
    console.log("Fetching weather data from:", apiUrl); // Log the full URL
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Log the error response if the OpenWeatherMap API fails
      const errorData = await response.json();
      console.error("Error from OpenWeatherMap API:", errorData);
      return res.status(response.status).json(errorData); // Send the error to the client
    }

    const data = await response.json();
    console.log("Weather data:", data); // Log the data received
    res.json(data); // Send the weather data to the frontend
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log the error
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
