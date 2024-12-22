import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// import PageTitle from "../../../../layouts/PageTitle";
import { IMAGES } from "../../../../constant/theme";
import useAxios from "../../../../../network/useAxios";
import { changeEditMenuItems, getCategoriesData, getSingleItemData } from "../../../../../urls/urls";
import { test_url_images } from "../../../../../config/environment";
const productListBlog = [
  { image: IMAGES.Product2, title: "Bacon Cheeseburger", price: "320" },
];

const CheckoutCheck = () => {
  const [orderItem, setOrderItem] = useState([])
  const [orderList, setOrderList] = useState([])
  const { id } = useParams();

  const notify = (message, status) => {
    if (status == "error") {
        toast.error(message);

    }
    else {
        toast.success(message);

    }
}
const [
  changeItemsgetOrderListResponse,
  changeItemsgetOrderListError,
  changeItemsgetOrderListLoading,
  changeItemsgetOrderListFetch,
] = useAxios();

useEffect(()=>{
  changeItemsgetOrderListFetch(getSingleItemData({
    menuId:id
  }))
},[id])

  const [categoryInput, setCategoryInput] = useState()
  const [
    getOrderListResponse,
    getOrderListError,
    getOrderListLoading,
    getOrderListFetch,
] = useAxios();

const [
  AddNewMenuResponse,
  AddNewMenuError,
  AddNewMenuLoading,
  AddNewMenuFetch,
] = useAxios();
const [selectedImage, setSelectedImage] = useState(null);

const [templateValue, setTemplateValue] = useState({
  ProductName: "Product Name",
  Description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
  Price: "0.00",
  Category: "choose..",
});

const fetchCustomerData = () => {
  getOrderListFetch(getCategoriesData())
}
const addMyMenuFunc = () => {
  AddNewMenuFetch(changeEditMenuItems({...templateValue, img:selectedImage, id:id}))
}
useEffect(() => {
  fetchCustomerData()
}, [])
useEffect(() => {
  if (getOrderListError?.response) {
      notify(getOrderListError?.response?.data, "error")
  }
}, [getOrderListError])
useEffect(() => {
  if (getOrderListResponse?.result == "success") {
      setOrderList(getOrderListResponse?.data)      

  }
}, [getOrderListResponse])
useEffect(() => {
  if (changeItemsgetOrderListResponse?.result == "success") {
    setOrderItem(changeItemsgetOrderListResponse?.data)     
    setTemplateValue({
      ProductName: changeItemsgetOrderListResponse?.data?.name,
      Description:
      changeItemsgetOrderListResponse?.data?.description,
      Price:changeItemsgetOrderListResponse?.data?.price,
      Category: changeItemsgetOrderListResponse?.data?.category?.name,
    }) 
  }
}, [changeItemsgetOrderListResponse])
useEffect(() => {
  if (AddNewMenuError?.response) {
      notify(AddNewMenuError?.response?.data, "error")
  }
}, [AddNewMenuError])
useEffect(() => {
  if (AddNewMenuResponse?.result == "success") {
    notify(AddNewMenuResponse?.message, "success")
  }
}, [AddNewMenuResponse])

  // State to hold the selected file

  const defaultImageUrl = IMAGES.Product2; // Replace with your default image path

  const handleImageChange = (event) => {
    
    setSelectedImage(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Reset to default image
  };

  // Handle file input change

  return (
    <Fragment>
      {/* <PageTitle activeMenu="Checkout" motherMenu="Shop" /> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {productListBlog.map((item, index) => (
                    <div className="col-lg-12 col-xl-6 col-xxl-4" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row m-b-20">
                            <div className="col-md-5 col-xxl-10">
                              <div className="new-arrival-product mb-3 mb-xxl-4 mb-md-4">
                                <div className="new-arrivals-img-contnent">
                                  {orderItem?.image && !selectedImage ?
                                  <img src={test_url_images+orderItem?.image}/>:  <img
                                  className="img-fluid border-img"
                                  src={
                                    selectedImage
                                      ? URL.createObjectURL(selectedImage)
                                      : defaultImageUrl
                                  } // Use selected image or default
                                  style={{ width: "300px", height: "200px" }}
                                  alt="Preview"
                                />
                                  }
                                  
                                
                                  <div className="">


                                  <i class="bi bi-trash-fill" onClick={()=>handleRemoveImage()} style={{
                            color:"red",
                            cursor:"pointer",
                            fontSize:"1.3rem"
                          }}></i>


                                
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7 col-xxl-12">
                              <div className="new-arrival-content position-relative">
                                <h4>
                                  <Link to="ecom-product-detail">
                                    {templateValue.ProductName || "Enter the product name"}
                                  </Link>
                                </h4>
                                <p className="price">
                                  €{templateValue.Price || "Price"}
                                </p>

                               
                                <p>Category: {templateValue.Category}</p>

                                <p className="text-content">
                                  {templateValue.Description || "Description"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body"></div>
                      </div>
                    </div>
                  ))}

                  <div className="col-md-8 order-md-1">
                    <h4 className="mb-4">Product Addon</h4>
                      <div className="row">
                        <div className="col-md-8 mb-3">
                    
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            accept="image/*"
                            onChange={handleImageChange} // Handle file change
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 mb-4">
                          <label htmlFor="firstName">Product name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            accept="text"
                            placeholder="Enter product Name"
                            required
                            defaultValue={orderItem?.name}
                            onChange={(e) => {
                              setTemplateValue((prev) => ({
                                ...prev,
                                ProductName: e.target.value,
                              }));
                            }}
                          />
                          <div className="invalid-feedback">
                            Valid first name is required.
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="card col-md-8">
                          <label className="">Product Description</label>

                          <div className="basic-form  ">
                            <form onSubmit={(e) => e.preventDefault()}>
                              <textarea
                                                          defaultValue={orderItem?.description}

                                className="form-txtarea form-control"
                                rows="4"
                                id="comment"
                                onChange={(e) => {
                                  setTemplateValue((prev) => ({
                                    ...prev,
                                    Description: e.target.value,
                                  }));
                                }}
                              ></textarea>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-8">
                          <label htmlFor="">Enter Price €</label>
                          <div className="input-group mb-3 ">
                            <span className="input-group-text">€</span>

                            <input
                              type="text"
                              defaultValue={orderItem?.price}

                              className="form-control"
                              onChange={(e) => {
                                setTemplateValue((prev) => ({
                                  ...prev,
                                  Price: e.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-8 mb-3">
                          <label htmlFor="state">Category's</label>
                          <Form.Control
                            as="select"
                            
                            onChange={(e) => {
                              setTemplateValue((prev) => ({
                                ...prev,
                                Category: e.target.value,
                              }));
                            }}
                          >
                            <option style={{ color: "blue" }}>Choose...</option>
                            {orderList.map((index)=>{
                              return (
                                <option value={index.name}>{index.name}</option>
                              )
                            })}
                           
                          </Form.Control>

                          <div className="invalid-feedback">
                            Please provide a valid state.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <hr className="col-md-8 mb-3" />
                        <div className="col-md-8">
                          <button
                            className="btn btn-primary btn-lg btn-block"
                            onClick={addMyMenuFunc}
                          >
                            Update Product
                          </button>
                        </div>
                      </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default CheckoutCheck;
