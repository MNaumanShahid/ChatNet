import { useState } from "react"
import { useAppContext } from "./context";

export function Sidebar() {
    const [expand, setExpand] = useState(56);
    const {onSend, prevPrompts, setPrevPrompts, recentPromp, setRecentPromp, newChat} = useAppContext();
    
    const expandHandler = () => {
        if(expand == 56) {
            setExpand(null);
        } else {
            setExpand(56);
        }
    }

    const loadPrompt = async(prompt) => {

    }


    return <div className={`inline-flex flex-col justify-between w-${expand} p-5 transition-all`}>

        <div className="">
            <div onClick={expandHandler} className="mb-16">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 p-2 cursor-pointer transition-colors rounded-full hover:bg-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <div onClick={newChat} className="flex gap-3 place-items-center cursor-pointer hover:bg-gray-200 p-3 mb-10 rounded-full justify-start transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {expand == 56 && (<div>New Chat</div>)}
            </div>

           {expand == 56 && ( 
                <div>
                <div className="mb-5">
                    <div>Recent</div>
                </div>
                {prevPrompts.map((item, index) => {
                    return (
                    <div onClick={(item) => loadPrompt(item)} className="inline-flex px-5 gap-3 place-items-center cursor-pointer hover:bg-gray-200 p-3 rounded-full justify-start transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                        <div>{item.slice(0,15)}...</div>
                    </div>
                    )
                })}

                </div>
            )}

        </div>
    </div>
}