import { useState } from "react"

export function Post(props){
    const comments = props.Comments;
    const [showComments, setShowComments] = useState(false);
    const [likes,setLikes] = useState(props.noOfLikes);
    const [isLiked,setIsLiked] = useState(false);
    return (
        <div className="mt-5 border-2 w-9/12 mx-auto p-3 rounded-md shadow-lg mb-5">
            <div className="flex font-black">
                <img className="w-12 h-12 rounded-full mr-3" src={props.ProfilePicture} alt="ProfilePic" />
                <div>{props.Username}</div>
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
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke="blue" stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
                    </svg>
                    </div>
                    <div onClick={() => {
                        isLiked ? (setLikes(likes-1)) : (setLikes(likes+1)) ;
                        isLiked ? (setIsLiked(false)) : (setIsLiked(true));
                    }} className="ml-2 mr-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
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
                            <div className="flex justify-between ">
                                <div className=" flex mt-5 my-5">
                                    <img className="w-9 h-9 rounded-full mr-3" src={comment.ProfilePicture} alt="ProfilePic" /> 
                                    <div className="mt-2">{comment.Username}: {comment.Content}</div>
                                </div>
                                <div className="mt-7">{comment.Timestamp}</div>
                            </div>
                        ))}
                    </div>
                    )
                    }
                </div>
        </div>
    )
}