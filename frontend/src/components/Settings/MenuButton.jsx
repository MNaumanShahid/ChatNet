import { useContext } from "react";
import { MenuContext } from "../../pages/context";

export function MenuButton({onClick, label, id}) {
    const {menu} = useContext(MenuContext);

    return <div onClick={onClick} className={`w-full ${menu == id ? "bg-gray-300" : "bg-white"} transition-colors duration-200 hover:bg-gray-300 my-1 cursor-pointer pl-2 pr-16 py-1 rounded-md font-medium`}>
        {label}
    </div>
}