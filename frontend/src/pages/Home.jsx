import { Topbar } from "../components/global/Topbar";
import { Sidebar } from "../components/global/Sidebar";
import { AddPost } from "../components/Home/AddPost";
import { Post } from "../components/Home/Post";
import { Users } from "../../dummyData";

export function Home() {
    const CurrentUser = Users.Users[0];
    return <div>
        <Topbar />
        <div className="grid homepage-grid items-start justify-items-center">
            <Sidebar />
            <div className="w-full">
                <AddPost />
                <Post ProfilePicture={CurrentUser.ProfilePicture}/>
            </div>
            <div className="bg-blue-400">Rightbar</div>
        </div>
    </div>
}