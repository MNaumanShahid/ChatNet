import { Topbar } from "../components/global/Topbar"
import { User } from "../components/messenger/User"
import { message_list, messages} from "../../dummyData"
import { useState , useEffect, useRef } from "react";
import { Message } from "../components/messenger/Message";

export function Messenger() {
    const usersList = message_list.user_message_list;
    const messageList = messages.messages;
    const [activeUser, setActiveUser] = useState();
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages are rendered or active user changes
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messageList, activeUser]);

    return (
        <div className="h-screen overflow-hidden">
            <Topbar />
            <div className="grid grid-cols-7 h-full">
                <div className="col-span-2 bg-gray-100" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                    <div className="h-16 flex shadow-sm">
                        <div className="mt-5 ml-6 mr-8 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                            </svg>
                        </div>
                        <div>
                            <input className="h-10 w-72 mt-3 rounded-md bg-gray-300 p-4" type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div  className="overflow-y-auto scrollbar" style={{ maxHeight: "calc(100vh - 8rem" }}>
                        {usersList.map(user => {
                            return <User activeUser={activeUser} setActiveUser={setActiveUser} profilePicture={user.profile_picture} username={user.username} firstName={user.first_name} lastName={user.last_name} key={user.userId} />
                        })}
                    </div>
                </div>
                <div className="relative col-span-5 bg-gray-500 overflow-y-auto scrollbar" >
                    {activeUser ? (
                        <div className="absolute w-full">
                            <div className="h-16 flex justify-between shadow-lg border-x-2 border-gray-300  bg-gray-100">
                                <div>
                                    <div className="ml-6 mt-2 text-lg font-medium font-sans">
                                        {activeUser}
                                    </div>
                                    <div className="ml-6 text-primary font-medium">
                                        online 
                                    </div>
                                </div>
                                <div className="flex mr-6 mt-4">
                                    <div className="mx-5 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-y-auto scrollbar h-full" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: "cover", backgroundPosition: 'center', maxHeight: "calc(100vh - 12rem" }} ref={messagesEndRef}>
                                {messageList.map(msg => {
                                    return <Message key={msg.message_id} content={msg.content} sent={msg.sent} timestamp={msg.timestamp} activeUser={activeUser} sender={msg.sender_username} />
                                })}
                            </div>
                            <div className="h-16 bg-gray-100 shadow-2xl border-2 border-gray-300 flex">
                                <div className="mt-3 ml-4 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                    </svg>
                                </div>
                                <div className="mt-1.5 ml-4 w-10/12 border-none outline-none">
                                    <input onChange={(e) => {
                                        setMessage(e.target.value);
                                    }} className="p-3 h-10 w-full bg-gray-100 border-none outline-none" type="text" placeholder="Write a message..." />
                                </div>
                                <div className="mt-3.5 mr-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="purple" className="w-7 h-7">
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                    </svg>
                                </div>
                                <div className="mt-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                </div>
                                <div className="mt-3.5 ml-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-7 h-7">
                                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="flex justify-center items-center text-center h-full font-sans font-medium italic text-3xl ">
                            Select a Friend to start chatting
                        </div>
                    )}
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style>
                {`
                    /* Track */
                    ::-webkit-scrollbar {
                        width: 2px;
                    }

                    /* Handle */
                    ::-webkit-scrollbar-thumb {
                        background: #4f4f4f;
                        border-radius: 5px;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: #555;
                    }
                `}
            </style>
        </div>
    )
}

  