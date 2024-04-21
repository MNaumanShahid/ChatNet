import { useState, useEffect } from "react";
import { Users } from "../../../dummyData"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../backend-url";

export function ProfileOps({clickHandler}) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [showBar, setShowBar] = useState(false);

    const token = localStorage.getItem("token");

    //get current user
    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data);
        })
    }, [])

    const settingBar =() => {
        setShowBar(prevShowBar => !prevShowBar);
    };

    const divHandler = (event) => {
        event.stopPropagation();
        if(clickHandler) clickHandler();
        settingBar();
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

    useEffect(() => {
        // Function to handle clicks outside of search box and suggestion box
        const handleClickOutside = () => {
          setShowBar(false);
        };
      
        // Add event listener when component mounts
        window.addEventListener("click", handleClickOutside);
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, []);

      if(!currentUser) {
        return <div>
            ?
        </div>
      }

    return  <div className="relative">
                <div onClick={divHandler} className="cursor-pointer h-12 w-12 overflow-hidden rounded-full">
                    <img className="w-full h-full" src={currentUser.profile_picture} alt="ops" />
                    {showBar && (
                    <div className="absolute top-full right-0">
                        <div className="bg-white border border-gray-300 rounded-md shadow z-10 p-1">
                            <div onClick={settingClickHandler} className="flex gap-1 items-center text-center rounded-md hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>Settings</div>
                            </div>
                            <div onClick={logoutHandler} className="flex gap-1 text-center rounded-md mt-1.5 text-lg hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                                </svg>
                                <div>Logout</div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
}