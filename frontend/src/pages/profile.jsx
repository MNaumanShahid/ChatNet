import { Topbar } from "../components/global/Topbar"
import { Sidebar } from "../components/global/Sidebar"

export function Profile() {

    return <div>
        <Topbar />
        <div className="grid homepage-grid items-center">
            <Sidebar />
        </div>
    </div>
}