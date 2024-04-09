export function User({profilePicture, firstName, lastName, username, setActiveUser}){
    return (
        <div onClick={() => {
            setActiveUser(username);
        }} className="flex justify-start hover:bg-primary hover:text-white border-gray-900 h-16 cursor-pointer">
            <div>
                <img className="rounded-full h-12 mt-2 mx-3" src={profilePicture} alt="User" />
            </div>
            <div className="mt-4 font-semibold text-lg font-sans">
                {firstName} {lastName}
            </div>
        </div>
    )
}
