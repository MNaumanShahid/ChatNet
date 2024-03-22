import { useState, useEffect, useRef } from "react";
import { Users } from "../../../dummyData"

export function SearchBar() {
  const users = Users.Users;
  const [suggestions, setSuggestions] = useState(users);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const onInputHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue.trim() === "") {
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
              <div key={index} className="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white rounded-md">
                <div>
                  <img className="w-9 h-9 mr-3 rounded-full" src={suggestion.ProfilePicture} alt="profilePic" />
                </div>
                <div>{suggestion.Username}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
