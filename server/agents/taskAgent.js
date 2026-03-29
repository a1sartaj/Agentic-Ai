import { fetchWeather } from "../tools/weatherTool.js";
import { tools } from "../tools/toolRegistry.js";

export const execute = (plan) => {

    const tool = tools[plan.toolName]

    console.log(tool)
   
    if(tool) {
        return {result : tool()}
    }

    return { result: "No matching tool found." };
}