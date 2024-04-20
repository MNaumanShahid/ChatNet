import { useNavigate } from "react-router-dom";
import { Users } from "../../../dummyData"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../backend-url";

export function Sidebar() {
    const navigate = useNavigate();

    //click handlers
    const goToHome = () => {
        navigate("/");
    }
    const goToProfile = () => {
        navigate("/profile");
    }
    const goToExplore = () => {
        navigate("/explore")
    }

    return <div className="m-3 justify-self-start">
        <ProfileButton onClick={goToProfile} />
        <Button label="Home" Icon={HomeIcon} onClick={goToHome}/>
        <Button label="Messenger" Icon={MessengerIcon} />
        <Button label="Explore" Icon={ExploreIcon} onClick={goToExplore} />
    </div>
}

function ProfileButton({onClick}) {
    const [currentUser, setCurrentUser] = useState(null);

    const token = localStorage.getItem("token");

    //get current user
    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data)
        })
    },[]);

    if(!currentUser) {
        return <div>
            Loading...
        </div>
    }

    return <div onClick={onClick} className="p-2 flex justify-start items-center hover:bg-gray-300 transition-colors duration-200 hover:cursor-pointer rounded-lg mb-5">
        <div className="h-14 w-14 rounded-full overflow-hidden mr-3">
            <img src={currentUser.profile_picture} alt="ProfilePic" />
        </div>
        <div className="text-xl font-semibold">
            {currentUser.first_name} {currentUser.last_name}
        </div>
    </div>
}

//Sidebar button
function Button({label, Icon, onClick}) {

    return <div onClick={onClick} className="p-2 flex gap-3 rounded-lg justify-start items-center hover:bg-gray-300 transition-colors duration-200 hover:cursor-pointer">
        <Icon />
        <div className="text-lg">
            {label}
        </div>
    </div>
}

//Sidebar icons
function HomeIcon() {

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
}

function MessengerIcon() {
   
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
    </svg>
  
}

function ExploreIcon() {

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
    </svg>
  
  
}
