import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  // hooks for storing user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // additional hooks
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  // function to handle signin
  const handlesubmit = async (e) => {

    e.preventDefault()

    // start loader
    setLoading(true)
    setError("")
    setSuccess("")

    try {

      const formdata = new FormData()

      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://slyney2248.alwaysdata.net/api/signin",
        formdata
      );

      // stop loader
      setLoading(false)

      if (response.data.user) {

        // store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setSuccess("Login successful")

        navigate("/")

      } else {

        setError("Login failed. Please try again...")
      }

    } catch (error) {

      setLoading(false)

      setError("Oops, something went wrong. Try again...")
    }

  }

  return (
    <div className='row justify-content-center m-4'>
      <div className="col-md-6 card shadow p-4">

        <h1 className='text-info'>Sign In</h1>

        {/* LOADING SPINNER */}
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Please wait while we authenticate your account...</p>
          </div>
        )}

        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>

          <input
            type="email"
            placeholder='Enter the email address'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> <br />

          <input
            type="password"
            placeholder='Enter the password'
            className='form-control'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <br />

          <input
            type="submit"
            value={loading ? "Signing in..." : "Signin"}
            className='btn btn-primary'
            disabled={loading}
          /> <br /> <br />

           Don't have an account? <Link to={'/signup'}>Register</Link>

        </form>

      </div>
    </div>
  )
}

export default Signin;