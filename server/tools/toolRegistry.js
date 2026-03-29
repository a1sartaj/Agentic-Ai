import { fetchWeather } from "./weatherTool.js";
import { createBooking } from "./bookingTool.js";

export const tools = {
    weather: fetchWeather,
    booking: createBooking
}