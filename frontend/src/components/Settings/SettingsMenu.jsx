import { useContext } from "react";
import { MenuContext } from "../../pages/context";
import { MenuButton } from "./MenuButton";

export function SettingsMenu() {
    const {menu, setmenu} = useContext(MenuContext);

    return <div className="flex flex-col justify-between m-2">
        <MenuButton id={1} onClick={() => setmenu(1)} label="Personal details" />
        <MenuButton id={2} onClick={() => setmenu(2)} label="Security" />
    </div>
}