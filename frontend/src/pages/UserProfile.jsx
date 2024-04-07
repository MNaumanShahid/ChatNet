import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Topbar } from "../components/global/Topbar"
import { Sidebar } from "../components/global/Sidebar"
import { Post } from "../components/Home/Post";
import { Posts, Users } from "../../dummyData"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../components/backend-url";
import { jwtDecode } from "jwt-decode";

import axios from "axios";



export function UserProfile() {

    const params = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followings, setFollowings] = useState(null);
    const [follows, setFollows] = useState(null);

    const token = localStorage.getItem("token");

    const jwt = token.split(" ")[1];
    const decoded = jwtDecode(jwt);

    //if clicked account is of current user only, redirect them to their own profile page
    if(params.username == decoded.sub) {
        navigate("/profile");
    }


    //get profile data
    useEffect(() => {
        axios.get(BACKEND_URL + "/profile/" + params.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setProfile(res.data);
        })
    }, []);

    //get followers of the profile
    useEffect(() => {   
        axios.get(BACKEND_URL + "/user/get_followers/" + params.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setFollowers(res.data.followers);
        })
    }, []);

    //get followings of the current user
    useEffect(() => {
        axios.get(BACKEND_URL + "/user/get_following/" + params.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setFollowings(res.data.following);
        })
    }, []);

    //check if the current user follows that profile or not
    useEffect(() => {
        axios.get(BACKEND_URL + "/check_follow/" + params.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            if(res.status == 200) {
                setFollows(true)
            } else {
                setFollows(false);
            }
        })
    },[])

    //get posts of the profile
    useEffect(() => {
        axios.get(BACKEND_URL + "/get_user_posts/" + params.username, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setPosts(res.data.posts);
        })
    },[])


    //follow a user
    const followHandler = () => {
        axios.post(BACKEND_URL + "/follow_user/" + params.username, {}, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            if(res.status == 200) {
                setFollows(true);
            }
        })
    }
    //unfollow a user
    const unFollowHandler = () => {
        axios.post(BACKEND_URL + "/unfollow_user/" + params.username, {}, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            if(res.status == 200) {
                setFollows(false);
            }
        })
    }


    // Conditionally render based on profile, followers, following being null
    if (!profile || !followers || !followings || !posts) {
        return <div>Loading...</div>;
    }

    //check if current user follows this user
    

    return <div>
        <Topbar /> 
        <div className="grid homepage-grid items-start">
            <Sidebar />    {/*Grid - Left Div */}
            <div> {/* Grid - Center Div */}

                <div className="flex ml-20 gap-20 mt-10 items-center">
                    <div className="rounded-full overflow-hidden h-36 w-36">
                        <img src={profile.profile_picture} alt="DisplayPic" />
                    </div>
                    <div>
                        <div className="flex gap-10">
                            <div className="text-3xl font-bold">
                                {profile.first_name} {profile.last_name}
                            </div>
                            {follows ? (
                                <div onClick={unFollowHandler} className="border-primary border rounded-full py-2 px-4 text-primary cursor-pointer font-semibold">
                                    UnFollow
                                </div>

                            ) : (
                                <div onClick={followHandler} className="bg-primary rounded-full py-2 px-4 text-white cursor-pointer font-semibold">
                                    Follow
                                </div>
                            )}
                            <div className="bg-primary rounded-full py-2 px-4 text-white cursor-pointer font-semibold">
                                Message
                            </div>
                        </div>
                        <div className="text-lg">
                            <b>Bio</b> <br />
                            {profile.bio}
                        </div>
                        <div className="flex gap-20 mt-5">
                            <div className="text-xl font-medium cursor-pointer">
                                <div>
                                    Followers
                                </div>
                                <div className=" flex justify-center">
                                    {followers.length}
                                </div>
                            </div>

                            <div className="text-xl font-medium cursor-pointer">
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
                <div className="w-full h-screen overflow-y-scroll mt-10">
                    {posts.map(post => {
                        return (
                            <div>
                                {post.image ? (
                                    <Post key={post.post_id} postId={post.post_id} ProfilePicture={profile.profile_picture} Username={post.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} image={post.image} timestamp={post.timestamp} />
                                ) : (
                                    <Post key={post.post_id} postId={post.post_id} ProfilePicture={profile.profile_picture} Username={post.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} timestamp={post.timestamp} />
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