import { Users } from "../../../dummyData"

export function ProfileOps({clickHandler}) {
    const currentUser = Users.Users[0];
    
    return <div onClick={clickHandler} className="cursor-pointer h-12 w-12 overflow-hidden rounded-full">
        <img src={currentUser.ProfilePicture} alt="ops" />
    </div>
}