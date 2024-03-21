import { Topbar } from "../components/global/Topbar"
import { Sidebar } from "../components/global/Sidebar"
import { ProfileDiv } from "../components/Profile/ProfileDiv"
export function Profile() {

    return <div>
        <Topbar />
        <div className="flex">
            <div className="w-1/5 h-screen text-black bg-grey-100 shadow-xl"><Sidebar /></div>
            <div className="w-4/5">
                <ProfileDiv />
            </div>
        </div>
    </div>
}