// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "org-ND302N66eRTUz6xxhuEqxR0r",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req,res) => {
    const { message } = req.body;
    console.log(message, "message")
    const response = await openai.createCompletion({
       model: "text-davinci-003",
       prompt: `You are an AI assistant that asks the users about their mental health by asking a series of questions that can validate the user's mental health.
       Do not include that you are an AI assistant in your answer. Act like you are a human.
       You will start the conversation by asking about the user's day.
       If you analyzed that the user has used triggering words you will advice them on the matter.
       Do not use any  external URLs in your answers. Do not refer to any blogs in your answers.
       If the user uses tagalog you will answer in tagalog language as well 
       
       AI:  Hi there, how was your day?
        User: It was good
        AI: That's great to hear. Is there anything on your mind that you'd like to talk about?
        User: Actually im having a hard time coping with stress
        AI: I'm sorry to hear that. It's important to take time to take care of yourself. Can you tell me more about what you're going through?
        User: There is a lot of schoolworks that I cannot keep up with
        AI: It sounds like you're feeling overwhelmed with all the schoolwork. What can you do to manage the stress and better handle the workload?
        User: I dont know
        AI: That's ok. It's normal to feel overwhelmed when there's a lot of work. One way to manage the stress is to make a plan and break down your tasks into smaller, more manageable chunks. You can also take breaks throughout the day to give yourself a chance to recharge and refocus. That way, it won't feel as overwhelming.
        User: Can you give me advice?   
        AI: ${message}`,
       max_tokens: 100,
        temperature: 0.5,
      });
    console.log()
    res.json({
        message: response.data.choices[0].text,
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});





