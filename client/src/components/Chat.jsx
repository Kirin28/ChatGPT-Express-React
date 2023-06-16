import React from 'react';
import { useEffect, useState } from 'react';

export default function Chat() {
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
        setIsTyping(false); 
      } else {
        setPrompts("");
        setIsTyping(true);
        try {
          await getResponse();
          setIsTyping(false); 
          setError("");
        } catch (error) {
          setIsTyping(false); // Set isTyping to false when there's an error
          setError("An error occurred while fetching the response.");
        }
        
      }
    };
  
  
  
    return (
      <>
       <div className='container text-center py-3 my-2'>
    
        <h3 className='pb-4'>Start a conversation with the bot!</h3>
        <div className='container divChat'>
          {chats && chats.length ? 
          chats.map((chat, index) => (
            <p key={index} className='py-2 px-4 mb-2 p-color d-flex justify-content-center col-lg-8 offset-lg-2'>
                {`${chat.role.toUpperCase()}: ${chat.content}`}
            </p>
          ))
        : ""}
        </div>
  
        <div className={isTyping ? "Typing..." : "hide"}>
          <p>
            <i>{isTyping ? "Typing..." : ""}</i>
          </p>
        </div>

       
       <div className='bottom-input'>
       <div className='divBorder'>
        <div className='input-container'>
        <form className='pt-4' action="" onSubmit={(e) => handleChat(e, prompt)}>
          <input className='py-2 mb-2' id='myInput' type="text" name='prompt' 
          placeholder="Send a message..."
          value={prompt}
          onChange={(e) => setPrompts(e.target.value)} />
          <button 
          onSubmit={(e) => handleChat(e, prompt)}
          className='py-2 mb-2 px-2 mx-1 sendBtn'><i className="fa-regular fa-paper-plane"></i></button>
        </form>
        </div>
        </div>
        </div>
        </div>
  
      </>
    )
}
