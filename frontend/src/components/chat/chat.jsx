"use client"
import { useEffect, useContext, useRef} from "react"
import { WsContext } from "../../context/socketContext";
import { chatContext } from "../../context/chatContext";
import Messages from "./message";


export default function Chat(){
    const ws = useContext(WsContext);
    const {chats, setChats} = useContext(chatContext)
   

    useEffect(()=>{
        if(ws.current){
            /** Handling incoming messages */
            ws.current.onmessage = async(e)=>{
                const msg = JSON.parse(e.data)
                console.log(msg)
                if(msg.type==="history"){
                   setChats(msg.message);
                }
                else if(msg.type==="message"){
                   setChats((prev)=>[...prev, msg.message]);
                
                }
            }
        }
    },[ws])



    return (
        <div className="w-full overflow x-hidden flex-1 m-0 z-20 h-auto gap-6 min-h-0 max-h-[calc(100%)] flex flex-col overflow-y-auto pt-[14vh] md:pt-[6vh] pb-[32vh] lg:pb-[28vh] px-[calc(3%)] md:px-[calc(15%)] xl:px-[25vw]">
            {chats.map((message,index)=>{
                return <Messages msg={message} key={index}/>
            })}
        </div>
    )
}