import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const systemMessage = {
    role: "system",
    content: `
You are AgentFlow AI.

Always respond in valid JSON format only.

If weather data is requested, return:
{
  "type": "weather",
  "city": "City name",
  "temperature": number,
  "description": "text"
}

If school-related or general educational content is requested:
Return structured HTML inside the "message" field:

{
  "type": "chat",
  "message": "<div style='font-family:Arial; padding:10px;'> ... formatted HTML here ... </div>"
}

Rules:
- Never return plain text.
- Never wrap in markdown.
- Never explain the JSON.
- Only return valid JSON.
`
};

export const generateResponse = async (message) => {
    const response = await client.responses.create({
        model: 'gpt-4o-mini',
        input: [systemMessage, ...message],
        tools: [
            {
                type: "function",
                name: "getWeather",
                description: "Get real-time weather information for a city",
                parameters: {
                    type: "object",
                    properties: {
                        city: { type: "string", description: "City name" }
                    },
                    required: ["city"]
                }

            },
            {
                type: "function",
                name: "calculate",
                description: "Calculate a mathematical expression",
                parameters: {
                    type: "object",
                    properties: {
                        expression: { type: "string" }
                    },
                    required: ["expression"]
                }

            },
            {
                type: "function",
                name: "getTime",
                description: "Get current time for a timezone",
                parameters: {
                    type: "object",
                    properties: {
                        timezone: { type: "string" }
                    },
                    required: ["timezone"]
                }

            }
        ]
    })

    return response;
}