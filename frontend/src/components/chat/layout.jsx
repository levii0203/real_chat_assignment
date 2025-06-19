import Input from "../input/input";
import Chat from "./chat";



export default function ChatLayout(){
    return (
        <div className="flex h-full flex-col w-full items-center">
           <Chat/>
            <div className="flex flex-col items-center bottom-0 justify-center pb-[10vh] z-[1000] sm:pb-3 absolute h-fit w-full bg-[#1d1e20]">
                <Input/>
            </div>
        </div>
    )
}