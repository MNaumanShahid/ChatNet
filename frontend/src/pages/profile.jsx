import { Topbar } from "../components/global/Topbar"
import { Sidebar } from "../components/global/Sidebar"
import { Post } from "../components/Home/Post";

import { Posts, Users } from "../../dummyData"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/backend-url";
import { SECTION_TYPE_GRANULARITY } from "@mui/x-date-pickers/internals/utils/getDefaultReferenceDate";
import { useNavigate } from "react-router";
import { Backdrop } from "@mui/material";


export function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followings, setFollowings] = useState(null);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    //if the user isn't logged in, re direct them to login page
    useEffect(() => {
        if(!token) {
            navigate("/signin");
        }
    }); 

    //get current user details
    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data);
        })
        
    }, []);

    //get current user's posts
    useEffect(() => {
        //return early if current user is still null
        if(!currentUser) {
            return
        }

        axios.get(BACKEND_URL + "/get_user_posts/" + currentUser.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setPosts(res.data.posts);
        })
    },[currentUser])

    //get followers of current user
    useEffect(() => {

        axios.get(BACKEND_URL + "/get_followers", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setFollowers(res.data.followers);
        })
    }, [])

    //get followings of current user
    useEffect(() => {
        axios.get(BACKEND_URL + "/get_following", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setFollowings(res.data.following)
        })
    },[])


    // Conditionally render based on currentUser being null
    if (!currentUser || !followers || !followings || !posts) {
        return <div>Loading...</div>;
    }

    return <div>
        <Topbar />
        <div className="grid homepage-grid items-start">
            <Sidebar />    {/*Grid - Left Div */}
            <div> {/* Grid - Center Div */}

                <div className="flex ml-20 gap-20 mt-10 items-center">
                    <div className="rounded-full overflow-hidden h-36 w-36">
                        <img src={currentUser.profile_picture} alt="DisplayPic" />
                    </div>
                    <div>
                        <div className="flex gap-10">
                            <div className="text-3xl font-bold ">
                                {currentUser.first_name} {currentUser.last_name}
                            </div>
                        </div>
                        <div className="text-lg">
                            <b>Bio</b> <br />
                            {currentUser.bio}
                        </div>
                        <div className="flex gap-20 mt-5">
                            <div className="text-xl font-semibold cursor-pointer">
                                <div>
                                    Followers
                                </div>
                                <div className=" flex justify-center">
                                    {followers.length}
                                </div>
                            </div>

                            <div className="text-xl font-semibold cursor-pointer">
                                <div>
                                    Following
                                </div>
                                <div className="flex justify-center">
                                    {followings.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-screen overflow-y-scroll">
                    {posts.map(post => {
                        return (
                            <div>
                                {post.image ? (
                                    <Post key={post.post_id} postId={post.post_id} ProfilePicture={currentUser.profile_picture} Username={currentUser.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} image={post.image} timestamp={post.timestamp} />
                                ) : (
                                    <Post key={post.post_id} postId={post.post_id} ProfilePicture={currentUser.profile_picture} Username={currentUser.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} timestamp={post.timestamp} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>   {/* Grid - Right Div */}

                {/*Rightbar content  */}

            </div>
        </div>
    </div>
}