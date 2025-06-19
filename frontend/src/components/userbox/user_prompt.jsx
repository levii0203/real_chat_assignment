"use client";
import { use, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { WsContext } from "../../context/socketContext";
import { chatContext } from "../../context/chatContext";


export default function UserPrompt(){
    const [userName, setUserName] = useState("");
    const { setUsername } = useContext(UserContext);
    const ws = useContext(WsContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(userName);
        /** Sending Joining req after connection */
        const msg = { type: "join", username: userName };
        ws.current.send(JSON.stringify(msg));
    };

    return (
        <div className="h-64 w-60 flex flex-col mt-12  justify-between items-center rounded-xl bg-black">
            <p className="text-2xl flex text-white mt-6 font-medium">Welcome!</p>
            <div className="flex gap-4 w-full flex-col justify-start mb-6">
                <label className="text-white ml-6 font-extralight">Give username<span className="text-red-500">*</span></label>
                <input className="flex rounded-md mx-6 bg-black ring-1 text-white ring-zinc-400 p-2 outline-1 " onChange={(e)=>setUserName(e.target.value)}></input>
                <button className="mx-6 mt-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 px-2" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}