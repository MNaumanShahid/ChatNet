import { Topbar } from "../components/global/Topbar";
import { Sidebar } from "../components/global/Sidebar";
import { AddPost } from "../components/Home/AddPost";
import { Post } from "../components/Home/Post";
import { Users } from "../../dummyData";
import { Posts } from "../../dummyData";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/backend-url";


export function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    //if user isn't logged in, redirect them to login page
    useEffect(() => {
        if(!token) {
            navigate("/signin");
        }
    },[]);

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
    },[])


    //get timeline posts
    useEffect(() => {
        axios.get(BACKEND_URL + "/get_timeline", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setPosts(res.data.posts)
        })
    },[posts])


    if(!currentUser || !posts) {
        return <div>Loading...</div>
    }

    return <div className="h-screen scrollbar" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        <Topbar />
        <div className="grid homepage-grid items-start justify-items-center">
            <Sidebar />
            <div className="w-full h-screen scrollbar overflow-y-scroll" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                <AddPost />
                {posts.map((post, index) => {
                    return (
                        <div>
                        {post.image ? (
                            <Post key={index} postId={post.post_id} ProfilePicture={post.profile_picture} Username={post.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} image={post.image} timestamp={post.timestamp} />
                        ) : (
                            <Post key={index} postId={post.post_id} ProfilePicture={post.profile_picture} Username={post.username} Text={post.post_text} noOfLikes={post.likes_count} noOfComments={post.comments_count} timestamp={post.timestamp} />
                        )}
                        </div>
                    )}
                )}
            </div>
            <div>
                {/* Rightbar content */}
            </div>
        </div>
        {/* Custom scrollbar styles */}
        <style>
                {`
                    /* Track */
                    ::-webkit-scrollbar {
                        width: 2px;
                    }

                    /* Handle */
                    ::-webkit-scrollbar-thumb {
                        background: #ffffff;
                        border-radius: 5px;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: #555;
                    }
                `}
            </style>
    </div>
}