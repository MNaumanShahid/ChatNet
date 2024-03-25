import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from 'dayjs';

import { InputBox } from "./InputBox";
import { Users } from "../../../dummyData";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../backend-url";

export function PersonalInfo() {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const[bio, setBio] = useState(null);
    const [city, setCity] = useState(null);
    const [dob, setDob] = useState(null);
    const [country, setCountry] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [parsedCurrentDob, setParsedDob] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data);
        })

    },[]);

    //set DOB after current user is fetched
    useEffect(() => {
        if(currentUser) {
            setParsedDob(dayjs(currentUser.dob, "ddd, DD MMM YYYY HH:mm:ss [GMT]"));
        }
    }, [currentUser]);

    const setDate = (newValue) => {
        setDob({
            day: newValue?.day(),
            month: newValue?.month() + 1,
            year: newValue?.year()
        });
    }

    let updateData = {
        password: null,
        update: {}
    };
    
    //filter out variables that have been changed and aren't null
    useEffect(() => {
        if(firstname) {
            updateData.update.first_name = firstname;
        }
        if(lastname) {
            updateData.update.last_name = lastname;
        }
        if(bio) {
            updateData.update.bio = bio;
        }
        if(city) {
            updateData.update.city = city;
        }
        if(country) {
            updateData.update.country = country;
        }
        if(dob) {
            updateData.update.dob = dob
        }
        if(password) {
            updateData.password = password;
        }
        
    }, [firstname, lastname, bio, city, country, dob, password]);
    
    const onClick = async () => {
        setError(null);
        try {
            //make sure update and password fields aren't null
            if(!Object.keys(updateData.update).length > 0) {
                throw new Error("No data updated");
            }
            if(!password) {
                throw new Error("Password is required");
            }
            const response = await axios.put(BACKEND_URL + "/update_user", updateData, {
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
                    <div>
                        <div className="text-xl font-normal">Firstname</div>
                            <InputBox value={currentUser.first_name} setValue={setFirstname} />
                    </div>
                    <div>
                        <div className="text-xl font-normal">Lastname</div>
                        <InputBox value={currentUser.last_name} setValue={setLastname} />
        
                    </div>
                    <div>
                        <div className="text-xl font-normal">Bio</div>
                        <InputBox value={currentUser.bio} setValue={setBio} />
                    </div>
                    <div>
                        <div className="text-xl font-normal">City</div>
                        <InputBox value={currentUser.city} setValue={setCity} />
                    </div>
                    <div>
                        <div className="text-xl font-normal">Country</div>
                        <InputBox value={currentUser.country} setValue={setCountry} />
                    </div>
                    <div>
                        <div className="text-xl font-normal mb-2">Date of Birth</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={parsedCurrentDob} onChange={setDate} format="DD/MM/YYYY" label="Select Date" className="w-full" />
                        </LocalizationProvider>
                    </div>
        
                </div>
                <div className="text-xl font-normal mt-20">
                    Confirm Your Password
                    <InputBox value={password} setValue={setPassword} />
                </div>
                <div className="mt-3">
                    <Button onClick={onClick} />
                </div>
                {error && (
                    <div className="text-red-600">
                        {error}
                    </div>
                )}
                {msg && (
                    <div>
                        {msg}
                    </div>
                )}
            </>
        )}
    </div> 
}