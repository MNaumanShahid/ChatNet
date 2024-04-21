import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../backend-url";
import { PasswordBox } from "./PasswordBox";

export function LoginCred() {
    const [confirm, setConfirm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePswd, setRePswd] = useState(null);
    const [ogPswd, setOgPswd] = useState(null);
    const [pswdMatch, setPswdMatch] = useState(null);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

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

    let updateUsername = {};
    useEffect(() => {
        if(username) {
            updateUsername.username = username;
        }
        if(ogPswd) {
            updateUsername.password = ogPswd
        }
    }, [username, ogPswd]);

    let updatePswd = {
        password: null,
        update: {}
    };
    useEffect(() => {
        if(password) {
            updatePswd.update.password = password
        }
        if(ogPswd) {
            updatePswd.password = ogPswd
        }
    }, [password, ogPswd]);


    useEffect(() => {
        if(password != rePswd) {
            setPswdMatch("Passwords don't match")
        } else {
            setPswdMatch(null);
        }
    },[password, rePswd]);

    const onClick = async () => {
        setError(null);
        setMsg(null);
        setMsg2(null);

        if(updateUsername.username) {

            try {
                //make sure update and password fields aren't null
                if(!Object.keys(updateUsername).length > 0) {
                    throw new Error("No data updated");
                }
                if(!ogPswd) {
                    throw new Error("Password is required");
                }
                const response = await axios.put(BACKEND_URL + "/update_username", updateUsername, {
                    headers: {
                        Authorization: token
                    }
                });
                setMsg("Updated username");
                const newJwt = response.data.access_token;
                const newToken = "Bearer " + newJwt;
                localStorage.setItem("token", newToken);
                updateUsername = {};
            }
            catch(err) {
                setError(err.response.data.message);
                console.log(err);
            }
        }

        if(Object.keys(updatePswd.update).length > 0) {
            try {
                if(!Object.keys(updatePswd.update) > 0) {
                    throw new Error("No data updated");
                }
                if(!ogPswd) {
                    throw new Error("Password is required");
                }
                const response = await axios.put(BACKEND_URL + "/update_user", updatePswd, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setMsg2("Updated Password");
                updatePswd = {
                    password: null,
                    update: {}
                }
            }
            catch(err) {
                console.log(err);
                setError(err.message);
            }
        }


    }

    const confirmHandler = () => {
        if(confirm) setConfirm(false);
        else setConfirm(true);
    }
    useEffect(() => {
        // Function to handle clicks outside of search box and suggestion box
        const handleClickOutside = () => {
          setShowBar(false);
        };
      
        // Add event listener when component mounts
        window.addEventListener("click", handleClickOutside);
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, []);

    const onConfirm = () => {
        alert("hello");
        confirmHandler();
    }
    const onCancel = () => {
        confirmHandler();
    }

    return <div className="relative">
        {confirm && (
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="bg-black opacity-50 absolute inset-0"></div>
            <div className="bg-white rounded-lg p-8 max-w-sm mx-auto relative">
              <h2 className="text-xl font-semibold mb-4">Confirm Account Deletion</h2>
              <p className="mb-4">Are you sure you want to delete your account?</p>
              <div className="flex justify-end">
                <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                  onClick={onConfirm}>Delete</button>
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={onCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-5">
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
                    {msg2 && (
                        <div>{msg2}</div>
                    )}
                </div>
                <div className="flex">
                    <div onClick={confirmHandler} className="border-2 border-red-400 text-red-600 mt-20 py-2 px-10 rounded-lg cursor-pointer">
                        Delete Your Account
                    </div>
                </div>
            </>
        )}
    </div> 
    </div>
}