import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { IMAGES, SVGICON } from '../../constant/theme';
import { Dropdown } from 'react-bootstrap';
import customerImg from "../../../images/customer/stock_user.png"
import useAxios from '../../../network/useAxios';
import { getSingleOrderDetails } from '../../../urls/urls';
import { ToastContainer, toast } from 'react-toastify';
import { formattedDate, getDataUsingStatus } from '../../commonFunctions';
import { test_url_images } from '../../../config/environment';


const historyData = [
    {title:'Your Order on Delivery by Courir', timing:'11:30 AM',},
    {title:'Driver Arrived at Restaurant', timing:'01:50 PM',},
    {title:'Preparing Your Order', timing:'02:20 PM',},
    {title:'Placed Order', timing:'04:05 PM',},
];

const foodItem = [
    {image: IMAGES.favirate5,  title:'Original Big Burger with Extra Spicy', amount:'17.50' },
    {image: IMAGES.favirate6,  title:'Big Pizza with Extra Spicy or Cheese', amount:'15.50' },
];

const OrderDetails = () => {
    const notify = (message, status) => {
        if (status == "error") {
            toast.error(message);
    
        }
        else {
            toast.success(message);
    
        }
    }


    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({})
    const [
        getOrderResponse,
        getOrderError,
        getOrderLoading,
        getOrderFetch,
    ] = useAxios();
    const getOrderData = () => {
        if(orderId)
        getOrderFetch(getSingleOrderDetails({
            uuid:orderId
        }))
    }
    useEffect(()=>{
        getOrderData()
    },[orderId])
    useEffect(() => {
        if (getOrderError?.response) {
            notify(getOrderError?.response?.data, "error")
        }
    }, [getOrderError])
    useEffect(() => {
        if (getOrderResponse?.result == "success") {
            setOrderData(getOrderResponse?.data[0])
            
        }
    }, [getOrderResponse])
    const handleCall = () => {
        window.location.href = `tel:${orderData?.user?.phone_number}`;
    };

    const handleMessage = () => {
        window.location.href = `sms:${orderData?.user?.phone_number}`;
    };
    return (
        <div className="container">
            <div className="row">
            <div className="col-xl-3">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card bg-primary h-auto">
                                <div className="card-body text-center">
                                    <span className="text-white">Order Status</span>
                                    <h3 className="mb-0 text-white">{getDataUsingStatus(orderData?.status)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-sm-6">
                            <div className="card h-auto">
                                <div className="card-body">
                                    <div className="profile-bx text-center">
                                        <img src={customerImg} className="avatar avatar-lg mb-3" alt="" />
                                        <h4 className="title mb-0">{orderData?.user?.full_name}</h4>
                                        <p>Customer</p>
                                        <ul className="d-inline-flex">
            <li>
                <Link to={"#"} className="icon-bx icon-bx-md bg-primary-light" onClick={handleCall}>
                    {SVGICON.CallIcon}
                </Link>
            </li>
            <li className="mx-3">
                <Link to={"#"} className="icon-bx icon-bx-md bg-primary-light" onClick={handleMessage}>
                    {SVGICON.MessageNote}
                </Link>
            </li>
        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-sm-6">
                            <div className="card h-auto">
                                <div className="card-body">
                                  
                                    <ul className="d-flex mb-3">
                                        <li>
                                            <Link to={"#"} className="icon-bx icon-outline-bx ">
                                                {SVGICON.CallIcon}
                                            </Link>
                                        </li>
                                        <li className="ms-2">
                                            <span className="mb-0">Telephone</span>
                                            <h6 className="mb-0">+351 {orderData?.user?.phone_number}</h6>
                                        </li>
                                    </ul>
                                    <ul className="d-flex mb-3">
                                        <li>
                                            <Link to={"#"} className="icon-bx icon-outline-bx">                                               
                                                {SVGICON.MessageNote}
                                            </Link>
                                        </li>
                                        <li className="ms-2">
                                            <span className="mb-0">Email</span>
                                            <h6 className="mb-0">{orderData?.user?.email}	</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
                <div className="col-xl-9">
             
                    <div className="row">
                        <div className="col-xl-4 col-md-6">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="title">History</h4>
                                </div>
                                <div className="card-body pt-2 px-0">
                                    <div  className="history-box dz-scroll" style={{height:"300px"}}>
                                        {orderData?.order_history.map((item, index)=>(
                                            <ul className="history" key={index}>
                                                <li>
                                                    <div className="history-dot"></div>
                                                    <div className="history-deatils">
                                                        <h6 className="font-w600">{getDataUsingStatus(item.status)}</h6>
                                                        <span className="text-primary">{formattedDate(item.stamp_at)}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            </div>	
                        </div>	
                        <div className="col-xl-8 col-md-6">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="h-title">Items</h4>
                                    <Dropdown className=" custom-dropdown mb-0">
                                        <Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
                                            {SVGICON.DropDots}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right" align="end">
                                            <Dropdown.Item >Details</Dropdown.Item>
                                            <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="card-body pt-2">
                                {orderData?.order_items?.map((item, ind) => (
                            <div className="food-items-bx" key={ind}>
                                <div className="food-items-media">
                                    <img src={test_url_images + item.item.image} alt="" />
                                </div>
                                <div className="d-flex align-items-end">
                                    <div className="food-items-info">
                                        <span className="text-primary">FOOD</span>
                                        <h6>{item.item?.name}</h6>
                                        <span>{item?.quantity} X</span>
                                    </div>
                                    <div className="d-inline-flex text-nowrap">
                                        <span className="me-2"></span>
                                        <h6 className="mb-0 text-primary">€ {(item?.item?.price * item?.quantity).toFixed(2)}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}                              
                                    <hr />
                                    <div className="food-totle">
                                        <ul className="d-flex align-items-center justify-content-between">
                                            <li><span>Subtotal</span></li>
                                            <li><h6>€ {orderData?.total_amount}</h6></li>

                                        </ul>
                                        <ul className="d-flex align-items-center justify-content-between">
                                <li><span>Full Address</span></li>
                                <li><h6>{orderData?.address?.street}<br />{orderData?.address?.city}<br/>{orderData?.address?.zip_code}</h6></li>
                            </ul>
                           
                                        <ul className="d-flex align-items-center justify-content-between">
                                <li><span>Order At</span></li>
                                <li><h6>{formattedDate(orderData?.ordered_at)}</h6></li>
                            </ul>
                           
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
            </div>
<ToastContainer/>
        </div>
    );
};

export default OrderDetails;