import { Topbar } from "../components/global/Topbar";
import { Sidebar } from "../components/global/Sidebar";
import { AddPost } from "../components/Home/AddPost";

export function Home() {
    return <div>
        <Topbar />
        <div className="grid homepage-grid items-start justify-items-center">
            <Sidebar />
            <div className="w-full">
                <AddPost />
            </div>
            <div className="bg-blue-400">Rightbar</div>
        </div>
    </div>
}