import { Users } from "../../../dummyData"


export function Main() {

    const currentUser = Users.Users[0];

    return <div className="w-full inline-flex justify-center">
        <div>
            <div className="text-6xl m-auto mt-24 text-gray-400 font-normal">
                <span className="greet">Hello {currentUser.firstname}, </span>
                <p>How may i help you today?</p>
            </div>
            <div className="flex justify-start gap-5 mt-36">
                <div> 
                    <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all delay-75">
                        <p>Give me some pics of cars</p>
                        <p>Logo</p>
                    </div>
                </div>
                <div> 
                    <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all delay-75">
                        <p>Give me something interesting</p>
                        <p>Logo</p>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all delay-75">
                        <p>Give me some pics of flowers</p>
                        <p>Logo</p>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-200 p-5 rounded-2xl h-52 w-56 text-xl hover:bg-gray-300 hover:cursor-pointer transition-all delay-75">
                        <p>suggest new friends</p>
                        <p>Logo</p>
                    </div>
                </div>
            </div>

            <div className="flex place-items-center pr-4 rounded-full mt-52 border-2">
                <input type="text" placeholder="Enter a prompt here..." className="w-full p-3 rounded-full focus:outline-none" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer hover:bg-gray-200 rounded-full p-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
            </div>
        </div>
    </div>
}