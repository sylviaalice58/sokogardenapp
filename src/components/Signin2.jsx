import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style2.css";

const Signin = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    setLoading("Please wait while we authenticate your account...");
    setError("");

    try{

      const formData = new FormData();
      formData.append("email",email);
      formData.append("password",password);

      const response = await axios.post(
        "https://kbenkamotho.alwaysdata.net/api/signin",
        formData
      );

      setLoading("");

      if(response.data.user){

        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/");
      }
      else{
        setError("Login failed. Please check your email or password.");
      }

    }
    catch(err){
      setLoading("");
      setError("Oops, something went wrong. Try again...");
    }
  }

  return (
  <div className="login-page">
    <div className="login-container">

      <div className="login-card">
        <h2>Login</h2>

        <p style={{color:"#0ef"}}>{loading}</p>
        <p style={{color:"red"}}>{error}</p>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="login-input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="login-forget-pass">
            <a href="#">Sign Up</a>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>
      </div>

      {[...Array(50)].map((_,i)=>(
        <span key={i} style={{"--i":i}}></span>
      ))}

    </div>
  </div>
);
};

export default Signin;