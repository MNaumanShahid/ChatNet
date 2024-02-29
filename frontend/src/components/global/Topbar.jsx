import { SearchBar } from "./SearchBar"
import { ProfileOps } from "./ProfileOps"
import { useNavigate } from "react-router"

export function Topbar() {
    const navigate = useNavigate();

    const LogoHandler = () => {
        navigate("/");
    }

    return <div className="flex justify-between bg-primary py-3 px-5">
        <div onClick={LogoHandler} className="text-3xl font-bold text-white cursor-pointer">
            ChatNet
        </div>
        <SearchBar />
        <ProfileOps />
    </div>
}