import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loarder';

const Makepayment = () => {

    // destructure the details passed from the get product component
    // the use location hook allows us to get /destructure the properties passed from the previous component
    const {product}=useLocation().state || {}

    // declare the navigate hook 
  const navigate =useNavigate()

    // console.log("The details passed ffrom getproduct are ",product)
    // Bellow we specify the image base url
  const img_url = "https://slyney2248.alwaysdata.net/static/images/"

//   initialize hooks to manage the state of you application
const [number, setNumber]=useState("")
const[loading,setLoading]=useState(false);
const[success,setSuccess]=useState("");
const[error,setError]=useState("");

// create a function that will handle the submit action
const handlesubmit = async (e) =>{
    // prevent site from reloading
    e.preventDefault()

    // update the loading hook
    setLoading(true)

    try{
        // create  a form data 
        const formdata =new FormData()

        // append the data to the formdata
        formdata.append("phone",number)
        formdata.append("amount",product.product_cost)

        const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment",formdata)

        // set loading back to false
        setLoading(false)

        // update the success hook with a message
        setSuccess(response.data.message)
        
    }
    catch(error){
        // if there is an error respond to error
        setLoading (false)

        // update the error hook with a message 
        setError(error.message)

    }
}

  return (
    <div className='row justify-content-center'>
        {/* <button className="btn btn-outline-primary ">Back to Product</button> */}
        <h1 className="text-success">Make Payment - Lipa na M-PESA</h1>
          <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back" onClick={() => navigate("/")}/>
        </div>
        <div className="col-md-6 card shadow p-4 ">
            <img src={img_url +product.product_photo} alt="productname" className='product_img'/>

            <div className="card-body">
                <h2 className="text-info">{product.product_name}</h2>

                <p className="text-dark">{product.product_description}</p>

               <h3> <b className="text-warning">Kes {product.product_cost}</b> <br /></h3>

                <form onSubmit={handlesubmit} >

                     {/* bind the loading hook */}
                    {loading && <Loader />}
                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>

                    <input type="tel"
                    className='form-control' 
                    placeholder='Enter the Phone Number 254xxxxxxxxx'
                    required
                    value={number}
                    onChange={(e)=> setNumber(e.target.value)}/> <br />

                    {/* {number} */}

                    <input type="submit" 
                    value="Make payment"
                    className='btn btn-success'/>
                    
                </form>
            </div>
        </div>

    </div>
  )
}

export default Makepayment;