import { Topbar } from "../components/global/Topbar";
import { Sidebar } from "../components/global/Sidebar";
import { AddPost } from "../components/Home/AddPost";
import { Post } from "../components/Home/Post";
import { Users } from "../../dummyData";
import { Posts } from "../../dummyData";
import { Comments } from "../../dummyData";
import { Likes } from "../../dummyData";



export function Home() {
    const users = Users.Users;
    const posts = Posts.posts;
    const comments = Comments.comments;
    const likes = Likes.likes;
    return <div>
        <Topbar />
        <div className="grid homepage-grid items-start justify-items-center">
            <Sidebar />
            <div className="w-full h-screen overflow-y-scroll">
                <AddPost />
                {posts.map((post) => {
                    return (
                        <div>
                        {post.Image ? (
                        <Post key={post.PostID} ProfilePicture={post.ProfilePicture} Username={post.Username} Text={post.PostText} noOfLikes={post.Likes.length} noOfComments={post.Comments.length} image={post.Image} Comments={post.Comments} />
                    ) : (
                        <Post key={post.PostID} ProfilePicture={post.ProfilePicture} Username={post.Username} Text={post.PostText} noOfLikes={post.Likes.length} noOfComments={post.Comments.length} Comments={post.Comments}/>
                        )}
                    </div>)
                    })}
            </div>
            <div className="bg-blue-400">Rightbar</div>
        </div>
    </div>
}