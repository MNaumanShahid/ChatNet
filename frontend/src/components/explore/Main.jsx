import { useState } from "react";
import { Users } from "../../../dummyData"
import { useAppContext } from "./context";


export function Main() {

    const {currentUser, exampleResponse,
        input,setInput,
        recentPrompt, setRecentPrompt,
        prevPrompts, setPrevPromts,
        showResult, setShowResult,
        loading, setLoading,
        resultData,setResultData,
        onSend,
        delayPara, greeting} = useAppContext();

    if(!currentUser) {
        return <div>
            Loading...
        </div>
    }

    return <div className="w-full inline-flex justify-center">
        <div className="w-full flex flex-col items-center justify-center overflow-y-scroll">

            {!showResult ? (<>
                <div className="text-6xl w-7/12 m-auto mt-24 text-gray-400 font-normal">
                    <div className="greet">Hello {currentUser.first_name}, </div>
                    <span className="greeting">{greeting}</span>
                </div>
                {/* <div className="flex w-7/12 justify-start gap-5 mt-36">
                    <div> 
                        <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all">
                            <p>Give me some pics of cars</p>
                            <p>Logo</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all">
                            <p>Give me something interesting</p>
                            <p>Logo</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all">
                            <p>Give me some pics of flowers</p>
                            <p>Logo</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all">
                            <p>suggest new friends</p>
                            <p>Logo</p>
                        </div>
                    </div>
                </div> */}
            </>
            ) : (<>
                <div className="w-7/12 absolute top-24">
                    <div className="flex gap-3 my-3">
                        <img src={currentUser.profile_picture} alt="profilePic" className="w-12 h-12 rounded-full" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="flex place-items-start gap-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-fuchsia-900">
                                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {loading ? (
                            <div className="loader flex flex-col gap-2 w-full">
                                <hr className="rounded-lg min-h-6 min-w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                                <hr className="rounded-lg min-h-6 min-w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                                <hr className="rounded-lg min-h-6 min-w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                            </div>
                        ) : <div className="text-base tracking-wide font-mono">
                                {resultData}
                            </div>
                            
                        }
                    </div>
                </div>
            </>
            )}

            <div className="flex place-items-center w-7/12 pr-4 absolute bottom-3 rounded-full mt-52 border-2">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here..." className="w-full p-3 rounded-full focus:outline-none" />
                <svg onClick={onSend} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 hover:bg-gray-300 rounded-full p-1 transition-colors">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </div>
        </div>
    </div>
}