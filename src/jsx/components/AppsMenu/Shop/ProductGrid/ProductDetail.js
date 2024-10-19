import React, { useEffect, useState } from "react";
import { Modal, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

import product1 from "../../../../../images/product/1.jpg";
import useAxios from "../../../../../network/useAxios";
import { ToastContainer, toast } from 'react-toastify';
import { AddNewCategory, DeleteCategory, getCategoriesData } from "../../../../../urls/urls";


const ProductDetail = () => {
  const [activeLink ,setActiveLink] = useState(0);
  const [orderList, setOrderList] = useState([])

  const notify = (message, status) => {
    if (status == "error") {
        toast.error(message);

    }
    else {
        toast.success(message);

    }
}
const [categoryInput, setCategoryInput] = useState()
  const [
    getOrderListResponse,
    getOrderListError,
    getOrderListLoading,
    getOrderListFetch,
] = useAxios();
  const [
    AddNewCategoryResponse,
    AddNewCategoryError,
    AddNewCategoryLoading,
    AddNewCategoryFetch,
] = useAxios();
  const [
    deleteCategoryResponse,
    deleteCategoryError,
    deleteCategoryLoading,
    deleteCategoryFetch,
] = useAxios();
const fetchCustomerData = () => {
  getOrderListFetch(getCategoriesData())
}
const deleteCategoryFunc = (id) => {
  deleteCategoryFetch(DeleteCategory({
    id:id
  }))
}
const AddNewCategoryFunc = () => {
  AddNewCategoryFetch(AddNewCategory({
    name:categoryInput
  }))
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
  if (AddNewCategoryError?.response) {
      notify(AddNewCategoryError?.response?.data, "error")
  }
}, [AddNewCategoryError])
useEffect(() => {
  if (AddNewCategoryResponse?.result == "success") {
    notify(AddNewCategoryResponse?.message, "success")
    fetchCustomerData()
    }
}, [AddNewCategoryResponse])
useEffect(() => {
  if (deleteCategoryError?.response) {
      notify(deleteCategoryError?.response?.data, "error")
  }
}, [deleteCategoryError])
useEffect(() => {
  if (deleteCategoryResponse?.result == "success") {
    notify(deleteCategoryResponse?.message, "success")
    fetchCustomerData()

  }
}, [deleteCategoryResponse])


  const [reviewToggle, setReviewToggle] = useState(false);
  return (
    <>
      <div className="container mh-auto">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
              

                  <div className="demo-view col-xl-6 col-lg-6  col-md-6 col-sm-12">
            <div className="container-fluid pt-10 ps-10 pe-lg-10 pe-10">
            <div className="demo-right-inner dlab-scroll " id="right-sidebar">
                <h4 className="title">Categories Avilable</h4>
                  <ul className="navbar-nav " id="menu-bar">
                      {orderList.map((item, ind)=>(
                        <li key={ind}>
                          <Link to={item.to}  smooth={true}
                            className={`scroll  `}
                            activeClass="active"
                            spy={true}
                            onClick={()=>setActiveLink(ind)}
                          > 
                          <div className="w-30 p-2">      <i class="bi bi-trash-fill" onClick={()=>deleteCategoryFunc(item.id)} style={{
                            color:"red",
                            cursor:"pointer"
                          }}></i>
                          &nbsp;{item.name} </div>

                          </Link>
                        </li>
                      ))}                     
                  </ul>	
            </div>
            </div>
          </div>
          
          <div className="col-xl-6 col-lg-6  col-md-6 col-sm-12">
                    <div className="product-detail-content">
                      {/*Product details*/}
                      <div className="new-arrival-content pr">

                        <div className="d-table mb-2">
                          <div className="card-body">
                           
                            <div className=" mb-3">
                              <label htmlFor="firstName">Category name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                accept="text"
                                placeholder="Enter Category Name"
                                onChange={(e)=>setCategoryInput(e.target.value)}
                                required
                              />
                              <div className="invalid-feedback">
                                Valid Category is required.
                              </div>
                            </div>
                            <div >
                              <div className="shopping-cart  mb-1 me-3">
                                <button
                                  className="btn btn-primary"
                                  onClick={()=>AddNewCategoryFunc()}
                                >
                                  
                                  Add Category
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        <div className="d-flex align-items-end flex-wrap mt-4">
                          <div className="filtaring-area me-3">
                            <div className="size-filter">
                              <div
                                className="d-flex select-size mb-2"
                                data-toggle="buttons"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ProductDetail;
