import { Topbar } from "../components/global/Topbar";
import { Sidebar } from "../components/global/Sidebar";

export function Home() {
    return <div>
        <Topbar />
        <div className="grid homepage-grid items-center">
            <Sidebar />
            <div className="bg-green-400">Feed</div>
            <div className="bg-blue-400">Rightbar</div>
        </div>
    </div>
}