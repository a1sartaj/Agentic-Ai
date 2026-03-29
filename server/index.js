import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import OpenAI from 'openai';
import chatRoute from './routes/chat.route.js'


// app.use(OpenAI(process.env.OPENAI_API_KEY))

const app = express()
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use('/chat', chatRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})