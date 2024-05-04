import { Topbar } from "../components/global/Topbar"
import { User } from "../components/messenger/User"
import { message_list, messages} from "../../dummyData"
import { useState , useEffect, useRef} from "react";
import { Message } from "../components/messenger/Message";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../components/backend-url";

export function Messenger() {
    const [usersList, setUsersList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [activeUser, setActiveUser] = useState("");
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);
    const [dotsActive, setDotsActive] = useState(false);
    const [showBar, setShowBar] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const messageInputRef = useRef(null); // Ref for the input element
    const [filter, setFilter] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    //fetch search results
  useEffect(() => {
    axios.get(BACKEND_URL + "/search_users/" + filter + "%", {
        headers: {
            Authorization: token
        }
        })
        .then(res => {
        setSuggestions(res.data.users);
        })
    }, [filter]);
    const onInputHandler = (event) => {
        setFilter(event.target.value);
    
        if (event.target.value.trim() === "") {
          setShowSuggestions(false); // Hide suggestions if input value is empty
        } else {
          setShowSuggestions(true);
        }
      };
      useEffect(() => {
        // Function to handle clicks outside of search box and suggestion box
        const handleClickOutside = (event) => {
          setShowSuggestions(false);
        };
    
        // Add event listener when component mounts
        window.addEventListener("click", handleClickOutside);
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, []);

    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(BACKEND_URL + "/get_following" , {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setUsersList(res.data.following);
        })
    },[]);

    const getMessages = async () => {
        const response = await axios.get(BACKEND_URL + "/get_messages/" + activeUser, {
            headers: {
                Authorization: token
            }
            })
            setMessageList(response.data.messages);
    }

    const sendMessage = async () => {
        if(message != ""){
            const response = await axios.post(BACKEND_URL + "/send_message/" + activeUser,{
                content: message
            }, {
                headers: {
                    Authorization: token
                }
            })
            setActiveUser(activeUser);
            setMessage("");
            getMessages();
            // Clear the input box after sending the message
            if (messageInputRef.current) {
                messageInputRef.current.value = "";
            }
        }
    }

    const settingClickHandler = () => {
        navigate("/settings");
    }
    const logoutHandler = () => {
        //logout
        const token = localStorage.getItem("token");
        axios.post(BACKEND_URL + "/logout", {
            headers: {
                "Authorization": token
            }
        })
        .then(res => {
            localStorage.removeItem("token");
        })
        .finally(() => {
            navigate("/signin");
        });
    }
    const goToProfile = (Username) => () => {

        if(Username == currentUser) {   //if the clicked user is current user, redirect him to /profile
            navigate("/profile");
        } else {                        //else take it to desired user's profile page
            navigate("/user/" + Username);
        }
    }

    useEffect(() => {
        // Scroll to the bottom when messages are rendered or active user changes
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messageList, activeUser]);

    useEffect(() => {
        // Function to handle clicks outside of search box and suggestion box
        const handleClickOutside = () => {
          setShowBar(false);
          setDotsActive(false);
        };
        // Add event listener when component mounts
        window.addEventListener("click", handleClickOutside);
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, []);

    return (
        <div className="h-screen overflow-hidden">
            <Topbar />
            <div className="grid grid-cols-7 h-full">
                <div className="col-span-2 bg-white" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                    <div className="relative h-16 flex shadow-sm bg-gray-100">
                        <div onClick={(event) => {
                            event.stopPropagation();
                            showBar ? (setShowBar(false)) : (setShowBar(true));
                        }} className="mt-5 ml-6 mr-8 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                            </svg>
                        </div>
                            {showBar && (
                                <div className="absolute top-full left-10">
                                    <div className="bg-white border border-gray-300 rounded-md shadow z-10 p-1">
                                        <div onClick={settingClickHandler} className="flex cursor-pointer gap-1 items-center text-center rounded-md hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-2">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>Settings</div>
                                        </div>
                                        <div onClick={logoutHandler} className="flex cursor-pointer gap-1 text-center rounded-md mt-1.5 text-lg hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                                            </svg>
                                            <div>Logout</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="relative">
                            <input ref={searchRef} onChange={onInputHandler} className="h-10 w-72 mt-3 rounded-md bg-gray-300 p-4" type="text" placeholder="Search" />
                            {showSuggestions && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow z-10 p-2">
                                    {suggestions.map((suggestion, index) => (
                                    <div onClick={() => {
                                        setActiveUser(suggestion.username)
                                        if(searchRef.current){
                                            searchRef.current.value = "";
                                        }
                                        }} key={index} className="flex place-items-center px-4 py-2 cursor-pointer hover:bg-gray-300 rounded-md">
                                        <div>
                                        <img className="w-9 h-9 mr-3 rounded-full" src={suggestion.profile_picture} alt="profilePic" />
                                        </div>
                                        <div>{suggestion.first_name} {suggestion.last_name}</div>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div  className="overflow-y-auto scrollbar" style={{ maxHeight: "calc(100vh - 8rem" }}>
                        {usersList.map((user, index) => {
                            return <User activeUser={activeUser} getMessages={getMessages} setActiveUser={setActiveUser} profilePicture={user.profile_picture} username={user.username} firstName={user.first_name} lastName={user.last_name} key={index} />
                        })}
                    </div>
                </div>
                <div className="relative col-span-5 bg-blue-100 overflow-y-auto scrollbar" >
                    {activeUser ? (
                        <div className="absolute w-full">
                            <div className="relative h-16 flex justify-between shadow-lg border-x-2 border-gray-300  bg-gray-100">
                                <div>
                                    <div className="ml-6 mt-4 text-lg font-medium font-sans">
                                        {activeUser}
                                    </div>
                                </div>
                                <div className="flex mr-6 mt-4">
                                    <div className="mx-5 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div onClick={(event) => {
                                        event.stopPropagation();
                                        dotsActive ? (setDotsActive(false)) : (setDotsActive(true));
                                    }} className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {dotsActive && (
                                        <div className="absolute top-full right-0">
                                            <div className="bg-white border border-gray-300 rounded-md shadow z-10 p-1">
                                                <div onClick={goToProfile(activeUser)} className="flex gap-1 items-center text-center cursor-pointer rounded-md hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-2">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </div>
                                                    <div>View Profile</div>
                                                </div>
                                                {/* <div className="flex gap-1 text-center rounded-md cursor-pointer mt-1.5 text-lg hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1">
                                                    <div className="mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg> 
                                                    </div>
                                                    <div>Delete Chat</div>
                                                </div> */}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="overflow-y-auto scrollbar h-screen" style={{ backgroundImage: 'url(/background.jpeg)', backgroundSize: "cover", backgroundPosition: 'center', maxHeight: "calc(100vh - 12rem" }} ref={messagesEndRef}>
                                {messageList.slice().reverse().map((msg, index) => {
                                    return <Message key={index} content={msg.content} sent={msg.sent} timestamp={msg.timestamp} activeUser={activeUser} sender={msg.sender_username} />
                                })}
                            </div>
                            <div className=" h-16 bg-gray-100 shadow-2xl border-2 border-gray-300 flex">
                                <div className="ml-5 mt-2.5 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                </div>
                                <div className="mt-1.5 ml-2 w-10/12 border-none outline-none">
                                    <input ref={messageInputRef} onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent default behavior (e.g., form submission)
                                            sendMessage();
                                        }
                                    }} onChange={(e) => {
                                        setMessage(e.target.value);
                                    }} className="p-3 h-10 w-full bg-gray-100 border-none outline-none" type="text" placeholder="Write a message..." />
                                </div>
                                <div onClick={sendMessage} className="mt-3 mr-3 ml-6 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="purple" className="w-7 h-7">
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
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

  