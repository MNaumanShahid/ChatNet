import { Topbar } from "../components/global/Topbar"
import { dummyUsers } from "../../dummyData"
import { User } from "../components/messenger/User"
export function Messenger(){
    return (
        <div>
            <Topbar />
            <div className="grid grid-cols-7 h-screen">
                <div className="col-span-2 bg-gray-100">
                    <div className="h-16 flex shadow-sm">
                        <div className="mt-5 ml-6 mr-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                            </svg>
                        </div>
                        <div>
                            <input className="h-10 w-72 mt-3 rounded-md bg-gray-300 p-4" type="text" placeholder="Search" />
                        </div>
                    </div>
                    {dummyUsers.map(user => {
                        return <User profilePhoto={user.profilePhoto} name={user.name} key={user.id} />
                    })}
                </div>
                <div className="col-span-5 bg-gray-500">
                    there
                </div>
            </div>
        </div>
    )
}