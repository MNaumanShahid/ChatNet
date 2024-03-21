export function ProfileDiv(props) {
  return (
      // https://picsum.photos/200
    <div>
      <div className="flex justify-center ">
        <div className="content-centre my-7 h-44 w-44">
          <img
            className="rounded-full"
            src="https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276205546.jpg"
            alt="ProfilePic"
          />
        </div>
        <div className="">
          <div className="flex mt-7">
            <div className="mx-4 text-2xl font-sans font-semibold">
              Thomas Shelby
            </div>
            <button className="bg-primary text-white w-36 rounded-md mx-1.5">
              Followings
            </button>
            <button className="bg-primary text-white w-36 rounded-md mx-1.5">
              message
            </button>
          </div>
          <div className="flex justify-evenly mt-4 text-lg font-black">
            <div>11 Posts</div>
            <div>500 Followers</div>
            <div>50 Following</div>
          </div>
          <div className="mt-5 mx-7 text-xl font-bold italic">Tommy</div>
          <div className="mt-1 mx-7 text-lg">
            <div>An artist</div>
            <div>Let's be friends</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
