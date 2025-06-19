"use client"
import { createContext, useState } from "react";

export const chatContext = createContext(null);


export default function ChatContextProvider({children}){
    const [chats, setChats] = useState([]);

    return (
        <chatContext.Provider value={{chats, setChats}}>
            {children}
        </chatContext.Provider>
    )
}