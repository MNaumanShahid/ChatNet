import { Main } from "../components/explore/Main";
import { Sidebar } from "../components/explore/Sidebar";
import { Topbar } from "../components/global/Topbar";

export function Explore() {

    return <div>
        <Topbar />
        <div className="flex">
            <Sidebar />
            <Main />
        </div>
    </div>
}