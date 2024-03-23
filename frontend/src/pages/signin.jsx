import { useState } from "react"

import { BACKEND_URL } from "../components/backend-url"
import { Logo } from "../components/Login/Logo"
import { InputBox } from "../components/Login/InputBox"
import { SubHeading } from "../components/Login/SubHeading"
import { Button } from "../components/Login/Button"
import { BottomWarning } from "../components/Login/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function SignIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState(null);

    return <div className="flex justify-between items-center h-screen bg-cover bg-gradient-to-r from-black to-violet-900">
        <div>
            <div className="m-10 text-7xl text-white font-bold">Welcome</div>
        </div>
        <div className="border-2 grid grid-cols-1 place-items-center h-auto mr-0 px-64 py-10 rounded-l-2xl bg-white">
            <Logo label={"ChatNet"} />
            <SubHeading label={"Join Today"} />

            <div className="justify-self-start text-xl my-1">Username</div>
            <InputBox onChange={(e) => setUsername(e.target.value)} />

            <div className="justify-self-start text-xl my-1">Password</div>
            <InputBox onChange={(e) => setPassword(e.target.value)} />

            <Button label={"Sign In"} onClick={async () => {

                try {
                    const response = await axios.post(BACKEND_URL + "/login", {
                        username,
                        password
                    });
                    //set token to local storage
                    localStorage.setItem("token", response.access_token);
                    //redirect them to homepage
                    navigate("/");
                }
                catch(err) {
                    console.log(err);
                    setError(err.response.data.message);
                }
            }} />
            <div className="bold text-red-600">{err}</div>
            <BottomWarning label={"New to ChatNet?"} buttonText={"SignUp"} to={"/signup"} />
        </div>
    </div>
}