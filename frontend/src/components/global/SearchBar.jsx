import { useState, useEffect, useRef } from "react";
import { Users } from "../../../dummyData";
import { BACKEND_URL } from "../backend-url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  
  // const users = Users.Users;
  const [suggestions, setSuggestions] = useState(null);
  const [filter, setFilter] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  //fetch search results
  useEffect(() => {
    axios.get(BACKEND_URL + "/search_users/" + filter + "%", {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      setSuggestions(res.data.users);
    })
  }, [filter]);

  const onInputHandler = (event) => {

    setFilter(event.target.value);

    if (event.target.value.trim() === "") {
      setShowSuggestions(false); // Hide suggestions if input value is empty
    } else {
      setShowSuggestions(true);
    }
  };



  useEffect(() => {
    // Function to handle clicks outside of search box and suggestion box
    const handleClickOutside = (event) => {
      setShowSuggestions(false);
    };

    // Add event listener when component mounts
    window.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const goToProfile = (username) => {
    navigate("/user/" + username);
  }


  // className="border border-gray-300 rounded-md px-4 py-2 w-full" {/* Apply Tailwind classes */}
  return (
    <div className="flex bg-white place-items-center p-1 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <div className="relative">
        {" "}
        {/* Use Tailwind's relative class */}
        <input
          onChange={onInputHandler}
          type="text"
          placeholder="Search"
          className="rounded-full w-96 px-2 h-full focus:outline-none"
        />
        {showSuggestions && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow z-10 p-2">
            {suggestions.map((suggestion, index) => (
              <div onClick={() => goToProfile(suggestion.username)} key={index} className="flex place-items-center px-4 py-2 cursor-pointer hover:bg-gray-300 rounded-md">
                <div>
                  <img className="w-9 h-9 mr-3 rounded-full" src={suggestion.profile_picture} alt="profilePic" />
                </div>
                <div>{suggestion.first_name} {suggestion.last_name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
