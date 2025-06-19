"use client"
import { createContext, useRef, useEffect} from "react";


export const WsContext = createContext(null);

export default function WsContextProvider({children}){
    const ws = useRef(null);


    useEffect(()=>{
        if(!ws.current){
        
            ws.current = new WebSocket('ws://localhost:8000');

            ws.current.onopen = ()=>{
                console.log("WebSocket connection established");
            }
            
            ws.current.onclose = ()=>{
                console.log("Reconnecting to websocket... ");
                ws.current = new WebSocket('ws://localhost:8000');
            }

        }
    },[])

    return (
        <WsContext.Provider value={ws}>
            {children}
        </WsContext.Provider>
    )
}
