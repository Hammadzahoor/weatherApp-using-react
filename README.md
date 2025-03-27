# Weather Application

A simple weather application built with React that allows users to search for current weather conditions and a 5-day forecast by city or country.

## Features

- Search for weather by city or country.
- Displays current weather conditions including temperature, humidity, visibility, and wind speed.
- Shows a 5-day hourly forecast.
- User-friendly interface with weather icons.

## Technologies Used

- React
- Axios for API calls
- OpenWeatherMap API for weather data
- React Icons for UI components

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hammadzahoor/weatherApp-using-react.git
   cd weatherApp-using-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```plaintext
   VITE_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

- Enter a city or country in the search bar and click the search button.
- The application will display the current weather and a 5-day forecast.
