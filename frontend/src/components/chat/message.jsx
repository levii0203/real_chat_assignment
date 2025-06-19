export default function Messages({msg}){
    const date = new Date(msg.createdAt);
    return (
        <div className="flex h-fit w-full justify-start items-center">
            <div className="flex ml-4 flex-col items-center">
                <p className="text-white w-full justify-start text-md font-medium">{msg.username+"  "}      <span className="text-sm text-zinc-300">{date.getHours()+":"+date.getMinutes()+" "+" "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</span></p>
                 <div className="flex items-center w-full px-2 py-2 bg-gray-100 rounded-xl xl:max-[60vh] lg:max-w-[40vh] md:max-w-[35vh] sm:max-w-[50vh] break-all shadow-xs max-w-[80%]">
                    <p className="flex flex-wrap xl:text-lg sm:text-normal text-base break-words font-light text-gray-900">{msg.message}</p>
                </div>
            </div>
        </div>
    )
}