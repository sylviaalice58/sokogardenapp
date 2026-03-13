import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  // define the two hooks for cupturing/storing the uses input
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  // declare he three additional hookes
  const[loading,setLoading]= useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

  // Below we have the use navigate hook to redirect us to another page on successful login/signin
  const navigate = useNavigate()
  
  // belowis the function to handle the signin action
  const handlesubmit =async (e) =>{
    // prevent site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account.")

    

    try{
      // Creat a formData object that will hold the email and passord
      const formdata =new FormData()

      // 10. Insert/append the email and the password on the formData created.
      formdata.append("email",email);
      formdata.append("password",password);

      // interact with axios for the response
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      // 12.set the loading hook back to default
      setLoading("");

      // Check whether the user exists as part of ur responce from the API
      if(response.data.user){
        // if user is there definately the details enteredduring signin are correct
        // setSuccess("Login successful")
        // if it is successful let a person get redirected to another page
        navigate("/")
      }
      else{
        // usernot found that means the credetials entered on the form are incorrect
        setError("Login failed. Please try again...")
      }

    }
    catch(error){
      // set loading back to default
      setLoading("")

      // update the error hook with message
      setError("OOps, something went wrong. Try again...")
    }
    

  }

  return (
    <div className='row justify-content-center m-4'>
        <div className="col-md-6 card shadow p-4">
          <h1 className='text-info'>Sign In</h1>

          <h5 className="text-info">{loading} </h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handlesubmit} >
            <input type="email" 
            placeholder='Enter the email address'
            className='form-control'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter the password'
            className='form-control' 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/> <br />

            {/* {password} */}

            <input type="submit"
            value="Signin" 
            className='btn btn-primary'/>

          </form>
        </div>
    </div>
  )
}

export default Signin;

// how can you store the users details into the local storage