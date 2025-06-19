"use client";
import { useContext, useRef } from "react";
import { WsContext } from "../../context/socketContext";
import { UserContext } from "../../context/userContext";
import { chatContext } from "../../context/chatContext";


export default function Input(){
    
    const userInput = useRef(null);
    const ws = useContext(WsContext);
    const {username} = useContext(UserContext)
    const { setChats } = useContext(chatContext);

    /** Sending message to websocket server */
    const SendMessage=()=>{
        const text = userInput.current.value;
        if(ws.current){
            ws.current.send(JSON.stringify({
                username:username,
                message: text
            }));
            /** Setting chat in user's window */
            setChats((prev) => [...prev, { username: username, message: text, createdAt: new Date().toISOString() }]);
            userInput.current.value = null;
        }
    }

    return (
        <div className={`h-full m-0 border-[1px] justify-end border-[#B3B3B3] focus:outline-1 p-0 z-20 xl:w-[calc(60%)] md:max-w-[80%] w-[calc(90%)]  bg-[#36383a] rounded-[20px] text-black flex items-center`}> 
            <input ref={userInput}  className="flex px-4 h-full m-0 w-full outline-none  break-all text-lg bg-transparent placeholder:font-thin placeholder:text-gray-400 text-white"  type="text" placeholder="Type a message"/>
            <div className="flex w-20 mt-3 mr-2 items-center h-full mb-2 justify-end">
                <div className={`flex rounded-full z-20 items-center  justify-center text-2xl h-fit py-2  border-[1px] border-[#B3B3B3]  px-4  md:h-12 md:w-12 hover:bg-opacity-65 hover:bg-slate-50 bg-white text-black font-semibold cursor-pointer  transition-transform hover:scale-110`}
                onClick={SendMessage}>
                    S
                </div>
            </div>
            
        </div>

    )
}
