import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import OpenAI from 'openai';
import chatRoute from './routes/chat.route.js'

// app.use(OpenAI(process.env.OPENAI_API_KEY))

const app = express()
app.use(cors());
app.use(express.json())


app.use('/chat', chatRoute)


app.listen(3000, () => {
    console.log(`Server is running or port 3000`)
})