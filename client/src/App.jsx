import { useEffect, useState } from 'react'
import './App.css';
import Chat from './components/Chat';

function App() {
  
  return (
    <>
    <div className='container text-center py-3'>
        <h1>NutroGPT - a GPT-3.5 powered nutrition assistant</h1>
        </div>
     <Chat/>
    </>
  )
}

export default App
