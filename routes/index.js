var express = require('express');
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

/* GET home page. */
router.get('/api', async function(req, res, next) {
  try {
    res.send('Hello from Homepage 5000!');
  } catch (error) {
    res.status(500).send(error);
  }
});


const configuration = new Configuration({
  organization: "", //insert your organization key
  apiKey: "", //insert your OpenAI API key
});
const openai = new OpenAIApi(configuration);

router.post("/api", async (req, res) => {
  const { chats } = req.body;
  const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
          {
              role: "system",
              content:  "You are a NutroGPT. You can help with healthy eating and nutrition advice. Stay on topic and avoid discussing unrelated subjects. If a user is asking a question on an unrelated subject, say to them that you are there to assist on the matters of nutrition, healthy eating and fitness, and if they want to talk about other subjects, advise them to visit the official OpenAI ChatGPT website. Remember, you only assist with healthy eating and nutrition"
          },
          ...chats,
      ],
  });
  res.send({
      output: result.data.choices[0].message,
  });
});

module.exports = router;
