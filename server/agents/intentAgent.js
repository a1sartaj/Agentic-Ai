import OpenAI from "openai/index.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function detectIntent(input) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `
Classify the user's intent as one of:
- weather
- booking
- general

Return ONLY valid JSON like:
{ "intent": "weather" }

User message: "${input}"
`,
    temperature: 0
  });

  try {
    return JSON.parse(response.output_text);
  } catch {
    return { intent: "general" };
  }
}