"use client";
import React, { useState } from "react";

const Page = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(""); // Use state to store errors
  const [formState, changeFormState] = useState([]);


  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "password" && value.length < 8) {
      setError("password is too short");
    } else {
      setError(""); // Clear error if conditions are met
    }
    
    // Update input values
    if (name === "username") {
      setInputUsername(value);
    } else if (name === "password") {
      setInputPassword(value);
    }
  };
  
  const handleSubmit = (e)=>{
    const allData =  {};
    e.preventDefault();

    if(error.length > 0 || inputUsername == "" || inputPassword == "")
    {
      console.log("error")
    }else{
      const form = e.target;
      const formData = new FormData(form);
      for(let data of formData.entries())
      {
        let key = data[0];
        let value = data[1];
        allData[key] = value;
      }      
      return changeFormState((oldData)=>{
        return [
          ...oldData,
          allData
        ]
      })
    }
  }
  console.log(formState)

  
  return (
    <>
      {
        formState.map((item)=>{
          return (
            <>
            <h1>{item.username}</h1>
            <h1>{item.password}</h1>
            </>
          )
        })
      }
      <div className="w-1/5 bg-yellow-300 px-3 py-5 rounded mx-auto my-20">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <h1>username</h1>
            <input name="username" onChange={handleChange} value={inputUsername} />
          </div>
          <div>
            <h1>password</h1>
            <input name="password" onChange={handleChange} value={inputPassword} />
          </div>
          <button type="submit" className="bg-black text-white w-fit">
            Submit
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default Page;
