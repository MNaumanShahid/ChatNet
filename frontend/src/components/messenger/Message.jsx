import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export function Message(props){
    return (
        <div className={`p-3 ${props.sender == props.activeUser ? "flex justify-end" : "flex justify-start"}`}>
            <div className="mx-3 mt-2 rounded-xl h-auto w-5/12 bg-primary text-white ">
                <div className="mt-3 mb-2 mx-4">
                    {props.content}
                </div>
                <div className="flex justify-end mr-3">
                    <div className="mb-1">{dayjs.utc(props.timestamp).format('HH:mm')}</div>
                    {props.sent && (
                        <div className="ml-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}