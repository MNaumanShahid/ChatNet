import { useEffect, useState } from "react";
import { Users } from "../../../dummyData"
import { BACKEND_URL } from "../backend-url";
import axios from "axios";
import { IMGUR_CLIENT_ID, IMGUR_TOKEN } from "../../assets/imgur";

export function AddPost() {
    const [currentUser, setCurrentUser] = useState(null);
    const [postText, setPosttext] = useState(null);
    const [file, setFile] = useState(null);

    const token = localStorage.getItem("token");

    //get currentUser
    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data);
        })
    },[])


    //upload image and create a new post
    const submitHandler = async (e) => {
        e.preventDefault();

        //if file exists, upload the image first then make the backend request
        if(file) {
            try {
                //upload the image
                let formData = new FormData();
                formData.append("image", file);

                const response = await axios.post("https://api.imgur.com/3/image", formData, {
                    headers: {
                        Authorization: IMGUR_TOKEN,
                    }
                });
                // let url = null;

                // const response = await fetch("https://api.imgur.com/3/image", {
                //     method: "post",
                //     headers: {
                //         Authorization: IMGUR_TOKEN
                //     },
                //     body: formData
                // })
                // const data = await response.json();
                // console.log(data);
                // throw new Error();
                
                
                //create post
                axios.post(BACKEND_URL + "/create_post",{
                    post_text: postText,
                    image: response.data.data.link
        
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    setPosttext("");
                    //refresh the page
                    window.location.reload();
                })
            }
            catch(err) {
                console.log(err);
            }
        }
        else {
            axios.post(BACKEND_URL + "/create_post",{
                post_text: postText,
    
            }, {
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                setPosttext("");
            })
        }

    }

    const changeHandler = (e) => {
        setPosttext(e.target.value);
    }

    if(!currentUser) {
        return <div>
            Loading...
        </div>
    }

    return <div className="mt-5 border-2 w-9/12 mx-auto p-3 rounded-md shadow-lg">
        <div className="text-2xl mb-2">Add a Post</div>
        <form onSubmit={submitHandler}>
            <div className="flex">
                <img className="w-12 h-12 rounded-full mr-3" src={currentUser.profile_picture} alt="ProfilePic" />
                <textarea value={postText} onChange={changeHandler} className="w-full" name="text"rows="4" placeholder="What's on your mind?"></textarea>
            </div>
            {file && (
                <div>
                    <div>
                        <img src={URL.createObjectURL(file)} alt="Post Image" />
                    </div>
                    <div className="w-32 text-center rounded-full my-3 cursor-pointer border-2 border-primary" onClick={() => setFile(null)}>
                        Clear Image
                    </div>
                </div>
            )}
            <div className="flex justify-around mt-3">
                <label htmlFor="file" className="flex gap-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <div>Photo</div>
                    <input className="hidden" id="file" name="file" type="file" accept=".jpeg, .png, .jpg" onChange={e => setFile(e.target.files[0])} />
                </label>
                <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div>Location</div>
                </div>

                <button type="submit" className="bg-primary text-white font-medium rounded-full px-5 py-1">
                    Share
                </button>
            </div>
        </form>
    </div>
}