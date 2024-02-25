import { useState } from "react"

import { Logo } from "../components/signInComponents/Logo"
import { InputBox } from "../components/signInComponents/InputBox"
import { SubHeading } from "../components/signInComponents/SubHeading"
import { Button } from "../components/signInComponents/Button"
import { BottomWarning } from "../components/signInComponents/BottomWarning"


export function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");


    return <div className="flex justify-between items-center h-screen w-screen bg-cover bg-gradient-to-r from-black to-violet-900">
        <div>
            <div className="m-10 text-7xl text-white font-bold">Welcome</div>
        </div>
        <div className="border-2 grid grid-cols-1 place-items-center mr-0 px-64 py-10 rounded-l-2xl bg-white">
            <Logo label={"ChatNet"} />
            <SubHeading label={"Join Today"} />

            <div className="justify-self-start text-xl my-1">Username</div>
            <InputBox onChange={(e) => setUsername(e.target.value)} />

            <div className="justify-self-start text-xl my-1">Email</div>
            <InputBox onChange={(e) => setEmail(e.target.value)}  />

            <div className="justify-self-start text-xl my-1">Firstname</div>
            <InputBox onChange={(e) => setFirstName(e.target.value)} />

            <div className="justify-self-start text-xl my-1">Lastname</div>
            <InputBox onChange={(e) => setLastname(e.target.value)} />

            <div className="justify-self-start text-xl my-1">Password</div>
            <InputBox onChange={(e) => setPassword(e.target.value)} />

            <Button label={"Sign Up"} onClick={() => {
                
                //send backend request here

            }} />
            <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />

            
        </div>
    </div>
}