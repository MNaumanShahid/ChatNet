import { useState } from "react";

import { InputBox } from "./InputBox";
import { Users } from "../../../dummyData";
import { Button } from "./Button";

export function LoginCred() {
    const currentUser = Users.Users[0];
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePswd, setRePswd] = useState(null);
    const [ogPswd, setOgPswd] = useState(null);

    return <div className="mt-5">
        <div className="grid grid-cols-2 gap-x-40 gap-y-7">
            <div className="col-span-2">
                <div className="text-xl font-normal">Username</div>
                    <InputBox value={currentUser.username} setValue={setUsername} />
            </div>
            <div>
                <div className="text-xl font-normal">New password</div>
                <InputBox value={null} setValue={setPassword} />

            </div>
            <div>
                <div className="text-xl font-normal">Re enter new password</div>
                <InputBox value={null} setValue={setRePswd} />
            </div>

        </div>
        <div className="text-xl font-normal mt-20">
            Old password
            <InputBox value={null} setValue={setOgPswd} />
        </div>
        <div className="mt-3">
            <Button />
        </div>
    </div> 
}