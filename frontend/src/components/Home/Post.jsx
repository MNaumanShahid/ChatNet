import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export function Post(props) {
    const [likes,setLikes] = useState(props.noOfLikes);
    const [isLiked,setIsLiked] = useState(false);
    const navigate = useNavigate();
    const comments = props.Comments;
    const [showComments, setShowComments] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");   //get jwt from local storage
    //     const decoded = jwtDecode(token);
    //     const setCurrentUser = decoded.sub;
    //  }, []);


    const goToProfile = (Username) => () => {

        if(Username == currentUser) {   //if the clicked user is current user, redirect him to /profile
            navigate("/profile");
        } else {                        //else take it to desired user's profile page
            navigate("/user/" + Username);
        }
    }

    return (
        <div className="mt-5 border-2 w-9/12 mx-auto p-3 rounded-md shadow-lg mb-5">
            <div className="flex font-black">
                <img onClick={goToProfile(props.Username)} className="w-12 h-12 rounded-full mr-3 cursor-pointer" src={props.ProfilePicture} alt="ProfilePic" />
                <div onClick={goToProfile(props.Username)} className="cursor-pointer">{props.Username}</div>
            </div>
            <div className=" font-medium ml-6 my-4">{props.Text}</div>
            {props.image ? (
                <div >
                    <img className="w-full h-96 my-4" src={props.image} alt="UserPost" />
                </div>
            ) : (
                <div></div>
            )}
            <div className="flex justify-between">
                <div className="flex ml-6">
                    <div onClick={() => {
                        isLiked ? (setLikes(likes-1)) : (setLikes(likes+1)) ;
                        isLiked ? (setIsLiked(false)) : (setIsLiked(true));
                    }} className="mr-2 cursor-pointer">
                        {isLiked ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        ) }
                    </div>
                    <div>{likes} People Liked it</div>
                </div>
                <div onClick={function (){
                    if(showComments){setShowComments(false)}
                    else{setShowComments(true)}
                }} className="cursor-pointer">{props.noOfComments} Comments</div>
            </div>
            <div>
                {showComments && (
                    <div className="mt-5">
                        {comments.map((comment) => (
                            <div className="flex justify-between items-center">
                                <div className="flex my-5">
                                    <img onClick={goToProfile(comment.Username)} className="w-9 h-9 rounded-full mr-3 cursor-pointer items-center" src={comment.ProfilePicture} alt="ProfilePic" /> 
                                    <div>
                                        <div onClick={goToProfile(comment.Username)} className="font-semibold cursor-pointer">
                                            {comment.Username} <br />
                                        </div>
                                        <div className="">
                                            {comment.Content}
                                        </div>
                                    </div> 
                                </div>
                                <div>
                                    {dayjs(comment.Timestamp).format('MMM D')}
                                </div>
                            </div>
                        ))}
                    </div>
                    )
                    }
            </div>
        </div>
    )
}