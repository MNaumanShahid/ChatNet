import { useState } from "react"
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"


import { BACKEND_URL } from "../components/backend-url"
import { Logo } from "../components/Login/Logo"
import { InputBox } from "../components/Login/InputBox"
import { SubHeading } from "../components/Login/SubHeading"
import { Button } from "../components/Login/Button"
import { BottomWarning } from "../components/Login/BottomWarning"
import { useNavigate } from "react-router-dom";


export function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState(null);
    const [err, setError] = useState(null);

    const setDate = (newValue) => {
        setDob(newValue?.format('DD-MM-YYYY HH:mm:ss'));
    }


    return <div className="flex justify-between items-center bg-cover bg-gradient-to-r from-black to-violet-900">
        <div>
            <div className="m-10 text-7xl text-white font-bold">Welcome</div>
        </div>
        <div className="border-2 grid grid-cols-1 h-auto place-items-center mr-0 px-64 py-7 rounded-l-2xl bg-white">
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

            <div className="justify-self-start text-xl my-1">Date of Birth</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={setDate} format="DD/MM/YYYY" label="Select Date" className="w-full my-1" />
            </LocalizationProvider>

            <div className="justify-self-start text-xl my-1">Password</div>
            <InputBox onChange={(e) => setPassword(e.target.value)} />

            <Button label={"Sign Up"} onClick={async () => {
                
                try {
                    const response = await axios.post(BACKEND_URL + "/signup", {
                        username,
                        email,
                        password,
                        firstname,
                        lastname
                    });
                    // re direct to homepage
                    setError(response.data.message);
                    localStorage.setItem("token", response.data.access_token);
                    navigate("/");
                }
                catch(err) {
                    console.log(err);
                    setError(err.response.data.message);
                }

            }} />
            <div className="bold text-red-600">{err}</div>
            <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
            
        </div>
    </div>
}