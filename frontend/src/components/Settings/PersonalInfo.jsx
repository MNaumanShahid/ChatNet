import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from 'dayjs';

import { InputBox } from "./InputBox";
import { Users } from "../../../dummyData";
import { Button } from "./Button";

export function PersonalInfo() {
    const currentUser = Users.Users[0];
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const[bio, setBio] = useState(null);
    const [city, setCity] = useState(null);
    const [dob, setDob] = useState(null);
    const [country, setCountry] = useState(null);
    const [password, setPassword] = useState(null);
    
    const parsedCurrentDob = dayjs(currentUser.dob, "DD-MM-YYYY HH:mm:ss");

    const setDate = (newValue) => {
        setDob(newValue?.format('DD-MM-YYYY HH:mm:ss'));
    }

    return <div className="mt-5">
        <div className="grid grid-cols-2 gap-x-40 gap-y-7">
            <div>
                <div className="text-xl font-normal">Firstname</div>
                    <InputBox value={currentUser.firstname} setValue={setFirstname} />
            </div>
            <div>
                <div className="text-xl font-normal">Lastname</div>
                <InputBox value={currentUser.lastname} setValue={setLastname} />

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
            <Button />
        </div>
    </div> 
}