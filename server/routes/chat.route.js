import express from 'express'
import { generateResponse, systemMessage } from '../services/openaiService.js';
import { addMessage, getMessages } from '../memory/sessionMemory.js';
import { getWeather } from '../tools/weatherTool.js';
import OpenAI from 'openai';
import { calculate } from '../tools/calculatorTool.js';
import { getTime } from '../tools/timeTool.js';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { message, sessionId = "default" } = req.body;

        addMessage(sessionId, 'user', message)

        const conversation = getMessages(sessionId)
        const response = await generateResponse(conversation)



        const toolCall = response.output?.find(
            item => item.type === "tool_call" || item.type === "function_call"
        );

        // console.log("response  : ", response.output)


        if (toolCall) {
            const arg = JSON.parse(toolCall.arguments);

            let toolResult;


            if (toolCall.name === "calculate") {
                toolResult = calculate(arg.expression);
            }

            if (toolCall.name === "getTime") {
                toolResult = getTime(arg.timezone);
            }

            if (toolCall.name === "getWeather") {
                toolResult = await getWeather(arg.city);
            }


            const finalResponse = await client.responses.create({
                model: "gpt-4o-mini",
                input: [
                    systemMessage,
                    ...conversation,
                    {
                        role: "assistant",
                        content: `Tool ${toolCall.name} was called with arguments: ${JSON.stringify(arg)}`
                    },
                    {
                        role: "assistant",
                        content: `Tool result: ${JSON.stringify(toolResult)}`
                    }
                ]
            });

            const reply = finalResponse.output_text;

            addMessage(sessionId, "assistant", reply);

            let parsed;

            try {
                parsed = JSON.parse(reply);
            } catch {
                parsed = { type: "chat", message: reply };
            }

            return res.json(parsed);
        }

        let parsed;

        try {
            parsed = JSON.parse(response.output_text);
        } catch {
            parsed = { type: "chat", message: response.output_text };
        }

        return res.json(parsed)


    } catch (error) {
        console.error(error)
    }
})


export default router