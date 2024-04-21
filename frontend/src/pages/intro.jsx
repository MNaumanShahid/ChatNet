import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../components/backend-url";
import { Button } from "../components/Login/Button";
import { useNavigate } from "react-router";

export function Intro() {
    const heading = "We're thrilled to have you onboard";
    const msg = "Before we get started, we'd love to learn a bit more about you to enhance your experience on ChatNet. Your responses will help us tailor our content and recommendations just for you. Let's get started!";
    const q1 = "Q1. Can you share some insights about your personality traits, interests and relevant information?";
    const q12 = "Your response will help us in creating a comprehensive profile that aids in recommending compatible users to others.";
    const q2 = "Q2. Can you provide some details about your hobbies, profession, educational background and related areas?";
    const q22 = "This will help for better recommendations."
    const q3 = "Q3. What types of users would you prefer to connect with on our platform?";
    const q32 = "Your preferences will guide us in tailoring recommendations for other users, aligning with your interests such as professional networking, dating or casual interactions.";
    const q4 = "Fantastic, Lets dive in!"


    const [currentUser, setCurrentUser] = useState(null);
    const [input, setInput] = useState("");
    const [msg1, setmsg1] = useState("");
    const [msg2, setmsg2] = useState("");
    const [ques1, setQues1] = useState("");
    const [ques2, setQues2] = useState("");
    const [ques3, setQues3] = useState("");
    const [ques12, setQues12] = useState("");
    const [ques22, setQues22] = useState("");
    const [ques32, setQues32] = useState("");
    const [ques4, setQues4] = useState("");
    const [resp1, setresp1] = useState("");
    const [resp2, setresp2] = useState("");
    const [resp3, setresp3] = useState("");

    const [responseNo, setResponseNo] = useState(1);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        renderHeading();
    },[])

    const renderHeading = async() => {
        //render headings
        for(let i = 0; i < heading.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setmsg1(prev => prev + heading[i])
                    resolve();
                },10);
            })
        }

        for(let i = 0; i < msg.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setmsg2(prev => prev + msg[i])
                    resolve();
                },10);
            });
        }

        //render q1
        for(let i = 0; i < q1.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues1(prev => prev + q1[i])
                    resolve();
                },10);
            });
        }
        for(let i = 0; i < q12.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues12(prev => prev + q12[i])
                    resolve();
                },10);
            });
        }
        
    }

    const renderQ2 = async() => {
        for(let i = 0; i < q2.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues2(prev => prev + q2[i]);
                    resolve();
                }, 10);
            })
        }
        for(let i = 0; i < q22.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues22(prev => prev + q22[i]);
                    resolve();
                }, 10);
            })
        }

    }
    const renderQ3 = async() => {
        for(let i = 0; i < q3.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues3(prev => prev + q3[i]);
                    resolve();
                }, 10);
            })
        }
        for(let i = 0; i < q32.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues32(prev => prev + q32[i]);
                    resolve();
                }, 10);
            })
        }
    }
    const renderQ4 = async() => {
        for(let i = 0; i < q4.length; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setQues4(prev => prev + q4[i]);
                    resolve();
                }, 10);
            })
        }
    }

    //submit Handler
    const submitHandler = async() => {
        if(responseNo == 1) {
            setresp1(input);
            setResponseNo(2);
            setInput("");

            //render second ques
            renderQ2();
        }
        else if(responseNo == 2) {
            setresp2(input);
            setResponseNo(3);
            setInput("");
 
            //render 3rd ques
            renderQ3();
        }
        else if(responseNo == 3) {
            setresp3(input);
            setResponseNo(4);

            renderQ4();
        }
        else if(responseNo == 4) {
            //submit to backend and re route to homepage
            try {
                await axios.post(BACKEND_URL + "/add_vdb_entry", {
                    answer1: resp1,
                    answer2: resp2,
                    answer3: resp3
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                navigate("/");
                
            }
            catch(err) {
                console.log(err);
            }
        }
    }


    useEffect(() => {
        axios.get(BACKEND_URL + "/", {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setCurrentUser(res.data)
        })
    },[])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler();
        }
    };

    
    if(!currentUser) {
        return <div>
            Loading...
        </div>
    }

    return <div className="grid grid-cols-1 w-screen h-screen justify-items-center">
            <div className="w-7/12 overflow-y-scroll pb-20">

                <div id={"welcome"} className="text-6xl mt-16 w-full greet">
                    Welcome {currentUser.first_name}
                </div>
                <div id={"heading"} className="text-3xl text-gray-400 w-full mt-6">
                    {msg1}
                </div>
                <div id={"msg"} className="text-2xl mt-5 w-full">
                    {msg2}
                </div>

                <div className="text-2xl mt-10 w-full">
                    {ques1} <br />
                    {ques12}
                </div>
                <div className="text-2xl mt-5 w-full bg-gray-200">
                    {resp1}
                </div>

                {(responseNo == 2 || responseNo == 3 ||  responseNo == 4) && (
                    <div className="text-2xl mt-10 w-full">
                    {ques2} <br />
                    {ques22}
                </div>
                )}
                <div className="text-2xl mt-5 w-full bg-gray-200">
                    {resp2}
                </div>

                {(responseNo == 3 || responseNo == 4) && (
                    <div className="text-2xl mt-10 w-full">
                    {ques3} <br />
                    {ques32}
                     </div>
                )}
                <div className="text-2xl mt-5 w-full bg-gray-200">
                    {resp3}
                </div>
                {(responseNo == 4) && (
                    <div className="text-2xl mt-10 w-full">
                    {ques4} <br />
                    <Button label={"Enter"} onClick={submitHandler} />
                </div>
                )}
            </div>

            <div className="flex place-items-center w-7/12 pr-4 absolute bottom-3 rounded-full mt-52 border-2">
                <input onKeyDown={handleKeyPress} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here..." className="w-full p-3 rounded-full focus:outline-none" />
                <svg onClick={submitHandler} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 hover:bg-gray-300 rounded-full p-1 transition-colors">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </div>
    </div>
}