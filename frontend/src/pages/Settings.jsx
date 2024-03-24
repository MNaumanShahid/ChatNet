import { useEffect, useState } from "react";
import { Topbar } from "../components/global/Topbar";
import { MenuContext } from "./context";
import { SettingsMenu } from "../components/Settings/SettingsMenu";
import { PersonalInfo } from "../components/Settings/PersonalInfo";
import { LoginCred } from "../components/Settings/LoginCred";
import { useNavigate } from "react-router";

export function Settings() {
    const [menu, setmenu] = useState(1);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        //if user isn't logged in, navigate them to login page
        if(!token) {
            navigate("/signin");
        }
    },[])

    return <div>
        <MenuContext.Provider value={{menu, setmenu}}>
            <Topbar />
            <div className="settings-grid items-start justify-items-center">
                <SettingsMenu />
                {menu == 1 && <PersonalInfo />}
                {menu == 2 && <LoginCred />}
            </div>
        </MenuContext.Provider>
    </div>
}



