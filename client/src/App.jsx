import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompts] = useState(""); //holds the information sent from App to the AI
  const [chats, setChats] = useState([]); //keeps track of all the messages sent by both user and gpt
  //const [isTyping, setIsTyping] = useState(false);


  const getResponse = async () => {
    try {
      let messages = [...chats];
      messages.push({ role: "user", content: prompt});

      const response = await fetch("/api" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chats: messages,
        })
      });

      const data = await response.json();

      messages.push(data.output);
      setChats(messages);

    } catch (e) {
      console.log(e);
    }
  };

  const handleChat = async (event) => {
    event.preventDefault();
    await getResponse();
    setPrompts("");
  };



  return (
    <>
     <main>
      <h1>NutroGPT - a GPT-3-based nutrition assistant</h1>
      <div>
        {chats && chats.length ? 
        chats.map((chat, index) => (
          <p key={index}>
              {chat.role.toUpperCase()}:
              {chat.content}
          </p>
        ))
      : ""}
      </div>



      <form action="" onSubmit={(e) => handleChat(e, prompt)}>
        <input type="text" name='prompt' value={prompt}
        onChange={(e) => setPrompts(e.target.value)} />
      </form>
     </main>
    </>
  )
}

export default App
