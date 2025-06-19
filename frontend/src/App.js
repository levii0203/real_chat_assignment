"use client"
import { useContext } from 'react';
import './App.css';
import ChatLayout from './components/chat/layout';
import { UserContext } from './context/userContext';
import UserPrompt from './components/userbox/user_prompt';

function App() {
  const {username} = useContext(UserContext)
  return (
    <div className="h-screen flex w-screen justify-center overflow-hidden bg-[#1d1e20]">
        {username ?(
          <ChatLayout/>
        ):(
          <UserPrompt/>
        )}
    </div>
  );
}

export default App;
