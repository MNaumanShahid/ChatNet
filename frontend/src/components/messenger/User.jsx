export function User(props){
    return (
        <div className="flex justify-start hover:bg-primary hover:text-white border-gray-900 h-16">
            <div >
                <img className="rounded-full h-12 mt-2 mx-3" src={props.profilePhoto} alt="User" />
            </div>
            <div className="mt-4 font-semibold text-lg font-sans">
                {props.name}
            </div>
        </div>
    )
}