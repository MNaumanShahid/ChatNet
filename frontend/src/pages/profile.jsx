import { Topbar } from "../components/global/Topbar"
import { Sidebar } from "../components/global/Sidebar"
import { Post } from "../components/Home/Post";

import { Posts, Users } from "../../dummyData"

export function Profile() {
    const currentUser = Users.Users[0];
    const posts = Posts.posts;

    return <div>
        <Topbar />
        <div className="grid homepage-grid items-start">
            <Sidebar />    {/*Grid - Left Div */}
            <div> {/* Grid - Center Div */}

                <div className="flex ml-20 gap-20 mt-10 items-center">
                    <div className="rounded-full overflow-hidden h-36 w-36">
                        <img src={currentUser.ProfilePicture} alt="DisplayPic" />
                    </div>
                    <div>
                        <div className="flex gap-10">
                            <div className="text-3xl font-bold ">
                                {currentUser.FirstName} {currentUser.LastName}
                            </div>
                        </div>
                        <div className="text-lg">
                            <b>Bio</b> <br />
                            {currentUser.Bio}
                        </div>
                        <div className="flex gap-20 mt-5">
                            <div className="text-xl font-semibold cursor-pointer">
                                <div>
                                    Followers
                                </div>
                                <div className=" flex justify-center">
                                    1234
                                </div>
                            </div>

                            <div className="text-xl font-semibold cursor-pointer">
                                <div>
                                    Following
                                </div>
                                <div className="flex justify-center">
                                    1234
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-screen overflow-y-scroll">
                    {posts.map(post => {
                        return (
                            <div>
                                {post.Image ? (
                                    <Post key={post.PostID} ProfilePicture={post.ProfilePicture} Username={post.Username} Text={post.PostText} noOfLikes={post.Likes.length} noOfComments={post.Comments.length} image={post.Image} Comments={post.Comments} />
                                ) : (
                                    <Post key={post.PostID} ProfilePicture={post.ProfilePicture} Username={post.Username} Text={post.PostText} noOfLikes={post.Likes.length} noOfComments={post.Comments.length} Comments={post.Comments}/>
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