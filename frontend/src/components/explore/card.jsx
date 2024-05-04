import { useNavigate } from "react-router-dom"

export function Card({first_name, last_name, profile_picture, username}){
    const navigate = useNavigate();
    const goToUser = () => {
        navigate("/user/" + username);
    }
    return (
        <div onClick={goToUser} className="cursor-pointer hover:bg-gray-300 w-8/12 h-auto border-2 border-gray-500 shadow-md rounded-md">
            <div className="flex my-3 h-12"> 
                <img className="ml-5 justify-start rounded-full" src={profile_picture} alt="User" />
                <div className="mt-3 ml-5">{username}</div>
            </div>
        </div>
    )
}