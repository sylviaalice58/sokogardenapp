import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loarder';
import { useNavigate } from 'react-router-dom';

const Getproduct = () => {

  // 2.Initialize hook to help you manage the state of your product
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");

  // declare the navigate hook 
  const navigate =useNavigate()

  // Bellow we specify the image base url
  const img_url = "https://slyney2248.alwaysdata.net/static/images/"

  // 3.create a function to help you fetch the products from ur API
  const fetchProducts =async()=>{
    try{
      //4. Update the loading hook
      setLoading(true)
        //5.interact with you end point for fetching the products
      const response =await axios.get("https://slyney2248.alwaysdata.net/api/get_products")

      // 6.update the product hook with the response given in the API
      setProducts(response.data)

      // 7.set the loading hook back to default
      setLoading(false)

    }
    catch(error){
      // if there is an error we need to
      // set the loading hook back to default
      setLoading(false)

      // update the error hook with a message
      setError(error.message)
    
    }
  }

  // We shall use the useEffect hook that automatically re-render new features in case of any changes.
  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products)


  return (
    <div className='row'>
      <h3 className="text-primary">Available products</h3>
        {loading && <Loader/>}
        <h4 className="text-danger">{error}</h4>

        {/* map the products fetched from the API to the user  interface */}

        {products.map((product) => (
          <div className="col-md-3 justify-content-center mb-3">
          <div className="card shadow">
            <img 
            src={img_url + product.product_photo} 
            alt="product name" 
            className='product_img mt-3'/>
            
            <div className="card-body">
              <h5 className="text-primary">{product.product_name}</h5>

              <p className="text-dark">{product.product_description.slice(0, 100)}...</p>

              <h4 className="text-danger"> KES {product.product_cost}</h4>

              <button className="btn btn-outline-primary" onClick={()=> navigate("/makepayment",{state:{product}})}>Purchase Now</button>
            </div>
          </div>
        </div>
        )   )}
        
    </div>
  )
}

export default Getproduct;