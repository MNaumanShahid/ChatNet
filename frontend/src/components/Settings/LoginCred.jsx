import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../backend-url";
import { PasswordBox } from "./PasswordBox";

export function LoginCred() {
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePswd, setRePswd] = useState(null);
    const [ogPswd, setOgPswd] = useState(null);
    const [pswdMatch, setPswdMatch] = useState(null);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);

    //fetch current user details
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data)
        })
    },[]);

    let updateData = {};
    useEffect(() => {
        if(username) {
            updateData.username = username
            console.log(updateData);
        }
        if(ogPswd) {
            updateData.password = ogPswd
            console.log(updateData);
        }
    }, [username, ogPswd]);


    useEffect(() => {
        if(password != rePswd) {
            setPswdMatch("Passwords don't match")
        } else {
            setPswdMatch(null);
        }
    },[password, rePswd]);

    const onClick = async () => {
        setError(null);
        try {
            console.log(updateData);
            //make sure update and password fields aren't null
            if(!Object.keys(updateData).length > 0) {
                throw new Error("No data updated");
            }
            if(!ogPswd) {
                throw new Error("Password is required");
            }
            const response = await axios.put(BACKEND_URL + "/update_username", updateData, {
                headers: {
                    Authorization: token
                }
            });
            setMsg(response.data.message);
        }
        catch(err) {
            setError(err.message);
        }
    }

    return <div className="mt-5">
        {currentUser && (
            <>
                <div className="grid grid-cols-2 gap-x-40 gap-y-7">
                    <div className="col-span-2">
                        <div className="text-xl font-normal">Username</div>
                            <InputBox value={currentUser.username} setValue={setUsername} />
                    </div>
                    <div>
                        <div className="text-xl font-normal">New password</div>
                        <PasswordBox setValue={setPassword} />

                    </div>
                    <div>
                        <div className="text-xl font-normal">Re enter new password</div>
                        <PasswordBox setValue={setRePswd} />
                        
                        {pswdMatch && (
                            <div className="text-red-600">{pswdMatch}</div>
                        )}
                    </div>

                </div>
                <div className="text-xl font-normal mt-20">
                    Old password
                    <PasswordBox setValue={setOgPswd} />
                </div>

                <div className="mt-3">
                    <Button onClick={onClick} />
                    {error && (
                        <div className="text-red-600">{error}</div>
                    )}
                    {msg && (
                        <div>{msg}</div>
                    )}
                </div>
            </>
        )}
    </div> 
}