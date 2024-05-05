import { Main } from "../components/explore/Main";
import { Sidebar } from "../components/explore/Sidebar";
import { Topbar } from "../components/global/Topbar";
import { AppProvider } from "../components/explore/context";

export function Explore() {

    return <div>
        <Topbar />
        <div className="flex">
            <AppProvider>
                <Sidebar />
                <Main />
            </AppProvider>
        </div>
    </div>
}