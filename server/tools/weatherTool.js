import axios from "axios";

export const getWeather = async (city = 'Delhi') => {

    try {
        const apiKey = process.env.WEATHER_API_KEY;

        // console.log(apiKey)

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        const weather = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        }

        // console.log(weather)

        return weather
    } catch (error) {

    }
}