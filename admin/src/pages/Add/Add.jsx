import React, { useEffect, useState } from 'react';
import './Add.css';
import { toast } from 'react-toastify';

function Add() {
  const url = "http://localhost:5000/data";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pure Veg",
    image: ""
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  let foodDetails = async (e) => {
    e.preventDefault();

    let imageBase64 = '';
    if (image) {
      imageBase64 = await convertToBase64(image);
    }

    const updatedData = { ...data, image: imageBase64 };

    try {
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Food item added successfully");
      } else {
        toast.error("Error adding food item");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Error fetching food list.");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="add">
      <form className="flex-col" onSubmit={foodDetails}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : 'https://content.hostgator.com/img/weebly_image_sample.png'} alt="Upload" />
          </label>
          <input type="file" id="image" name="image" hidden required onChange={(e) => {
              const selectedImage = e.target.files[0];
              setImage(selectedImage);
              setData({ ...data, image: selectedImage });
            }}/>
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} value={data.name} type="text" name="name" placeholder="Type here"/>
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} value={data.description} name="description" rows="6" placeholder="Write content here" required/>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} name="category" value={data.category}>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Non Veg">Non Veg</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Sweets">Sweets</option>
              <option value="Cake">Cake</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} value={data.price} name="price" placeholder="₹99"/>
          </div>
        </div>

        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default Add;
