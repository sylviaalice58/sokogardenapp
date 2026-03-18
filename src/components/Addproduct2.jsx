import React, { useState, useRef } from 'react';
import Loader from './Loarder';
import axios from 'axios';

const Addproducts = () => {

  // Product state
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  // App state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // 🔐 Handle submit with authentication
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Get token from localStorage
    const token = localStorage.getItem("token");

    // 🚫 If no token → block request
    if (!token) {
      setError("Unauthorized! Please login first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // 🔐 Send request with token
      const response = await axios.post(
        "https://slyney2248.alwaysdata.net/api/add_product",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setLoading(false);
      setSuccess(response.data.message);

      // Clear success after 3 sec
      setTimeout(() => setSuccess(""), 3000);

      // Reset form
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      setLoading(false);

      // 🔐 Handle unauthorized errors
      if (error.response && error.response.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token"); // logout user
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3>Welcome to Add Product</h3>

        {/* Loading */}
        {loading && <Loader />}

        {/* Messages */}
        <h4 className="text-success">{success}</h4>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder='Enter product name'
            className='form-control'
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          /> <br />

          <input
            type="text"
            placeholder='Enter the product description'
            className='form-control'
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          /> <br />

          <input
            type="number"
            placeholder='Enter the price of the product'
            className='form-control'
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          /> <br />

          <label className='text-primary'>Product photo</label>
          <input
            type="file"
            className='form-control'
            required
            accept='image/*'
            ref={fileInputRef}
            onChange={(e) => setProductPhoto(e.target.files[0])}
          /> <br />

          <input
            type="submit"
            value="Add Product"
            className='btn btn-outline-primary'
          />

        </form>
      </div>
    </div>
  );
};

export default Addproducts;

// af09178ac32a773cd3628d41abbc113536bf2c3b09aa0824d38a3e4bffdb1927