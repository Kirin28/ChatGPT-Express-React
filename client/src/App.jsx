import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompts] = useState(""); //holds the information sent from App to the AI
  const [chats, setChats] = useState([]); //keeps track of all the messages sent by both user and gpt
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");


  const getResponse = async () => {
    try {
      let messages = [...chats]; //creates a new copy of chats array with the spread operator -> to hold a history of the first prompt, without it the assistant will produce an arbitrary query before the user sends the prompt
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
    if (!prompt) {
      setError("Please type something in the input box.")
      setIsTyping(true); 
    } else {
      await getResponse();
      setPrompts("");
      setIsTyping(false); 
      setError("");
    }
  };



  return (
    <>
     <div className='container text-center py-3 my-2'>
      <h1>NutroGPT - a GPT-3.5 powered nutrition assistant</h1>
      <br />
      <h3 className='pb-4'>Start a conversation with the bot!</h3>
      <div className='container d-flex flex-column align-items-center justify-content-center'>
        {chats && chats.length ? 
        chats.map((chat, index) => (
          <p key={index} className='py-2 px-4 p-color'>
              {`${chat.role.toUpperCase()}: ${chat.content}`}
          </p>
        ))
      : ""}
      </div>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

     
      <form className='pt-4' action="" onSubmit={(e) => handleChat(e, prompt)}>
        <input className='form-control text-center py-2 mb-2' type="text" name='prompt' 
        placeholder="Send a message..."
        value={prompt}
        onChange={(e) => setPrompts(e.target.value)} />
      </form>


      </div>

    </>
  )
}

export default App
