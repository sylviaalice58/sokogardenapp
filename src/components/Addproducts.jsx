import React, { useState, useRef } from 'react'
import Loader from './Loarder';
import axios from 'axios';


const Addproducts = () => {

  // introduce the hooks
  const [product_name, setProductName]=useState("");
  const[product_description,setProductDescription]=useState("");
  const[product_cost,setProductCost]=useState("");
  const[product_photo,setProductPhoto]=useState("");

  // declare the additional hook to manage the state of the application
  const[loading,setLoading]=useState(false);
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");
  const fileInputRef = useRef(null);

  // Create a fiunction that will handle the submit action
  const handleSubmit =async(e) =>{
    // prevent site from reloading
    e.preventDefault()

    // Set loading hook with a message(activate it)
    setLoading(true)

    try{
      // create a formdata
      const formdata =new FormData()

      // Append the details to the form data created
      formdata.append("product_name",product_name);
      formdata.append("product_description",product_description);
      formdata.append("product_cost",product_cost);
      formdata.append("product_photo",product_photo);

      // Interact with the axios to help u use the method post
      const response = await axios.post("https://slyney2248.alwaysdata.net/api/add_product",formdata)

      // set the loading hook back to default
      setLoading(false)

      // update the success hook with a message
      setSuccess(response.data.message)

      setTimeout(() => {
        setSuccess("");
      }, 3000);
      

      // Clearing the hooks(setting them back to default / empty)
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("")

      // clear file input field
      if (fileInputRef.current) {
      fileInputRef.current.value = "";
      // Or
      // e.target.reset()
}


    }
    catch(error){
      // Setting loading hook back to default
      setLoading(false)

      // update the error message
      setError(error.message)

    }
  }


  return (
    <div className='row justify-content-center mt-4'>
       <div className="col-md-6 p-4 card shadow">
        <h3>Welcome to Add Product</h3>
       
       {/* Bind the loading hook */}
        {loading && <Loader/>}

          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='Enter product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}/> <br />

          {/* {product_name} */}

          <input type="text" 
          placeholder='Enter the product description'
          className='form-control'
          required
          value={product_description}
          onChange={(e)=> setProductDescription(e.target.value)}/> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter the price of the product' 
          className='form-control'
          required
          value={product_cost}
          onChange={(e)=>setProductCost(e.target.value)}/> <br />
          {/* {product_cost} */}

          <label className='text-primary'>Product photo</label>
          <input type="file" 
          className='form-control'
          required
          accept='image/*'
          ref={fileInputRef}
          onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

          

          <input type="submit" 
          value= "Add Product"
          className='btn btn-outline-primary'></input>
        </form>
       </div>
    </div>
  )
}

export default Addproducts;