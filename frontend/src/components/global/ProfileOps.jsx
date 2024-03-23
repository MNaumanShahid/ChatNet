import { useState, useEffect } from "react";
import { Users } from "../../../dummyData"

export function ProfileOps({clickHandler}) {
    const currentUser = Users.Users[0];
    const [showBar, setShowBar] = useState(false);
    const settingBar =() => {
        setShowBar(prevShowBar => !prevShowBar);
    };
    const divHandler = (event) => {
        event.stopPropagation();
        if(clickHandler) clickHandler();
        settingBar();
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
    return  <div className="relative">
                <div onClick={divHandler} className="cursor-pointer h-12 w-12 overflow-hidden rounded-full">
                    <img src={currentUser.ProfilePicture} alt="ops" />
                    {showBar && (
                    <div className="absolute top-full right-0">
                        <div className="bg-white border border-gray-300 rounded-md shadow z-10 p-2">
                            <div className="flex text-center rounded-md hover:bg-primary hover:text-white">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1 ml-2">
                                        <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3 text-lg mr-3 mt-1 mb-1">Settings</div>
                            </div>
                            <div className="text-center rounded-md mt-1.5 text-lg hover:bg-primary hover:text-white mb-1">
                                Log Out   
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
}