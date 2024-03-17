import { Users } from "../../../dummyData"

export function AddPost() {
    const currentUser = Users.Users[0];

    return <div className="mt-5 border-2 w-9/12 mx-auto p-3 rounded-md shadow-lg">
        <div className="text-xl mb-2">Add a Post</div>

        <div className="flex">
            <img className="w-12 h-12 rounded-full mr-3" src={currentUser.ProfilePicture} alt="ProfilePic" />
            <textarea className="w-full" name="share" id="1"rows="4" placeholder="What's on your mind?"></textarea>
        </div>

        <div className="flex justify-around mt-3">
            <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <div>Photo</div>
            </div>
            <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>Location</div>
            </div>

            <button className="bg-primary text-white rounded-md px-5 py-1">Share</button>
        </div>
    </div>
}