import React, { useEffect, useRef, useState, } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Dropdown, Button } from 'react-bootstrap';
import Select from 'react-select';
import { IMAGES } from '../../constant/theme';

import { SVGICON } from '../../constant/theme';
import useAxios from '../../../network/useAxios';
import { ChangeOrderStatus, getOrderList, orderMarkedAttended } from '../../../urls/urls';
import { ToastContainer, toast } from 'react-toastify';
import { formattedDate, getDataUsingStatus, getStatusBadgeClass} from '../../commonFunctions';
import { test_url_images } from '../../../config/environment';

// import { io } from "socket.io-client";



const options = [
    { value: '1', label: 'Today' },
    { value: '2', label: 'Yesterday' },
]
const notify = (message, status) => {
    if (status == "error") {
        toast.error(message);

    }
    
    else {
        toast.success(message);

    }
}

const OrderList = () => {


    const [orderList, setOrderList] = useState([])
    const [filter, setFiler] = useState(options[0])
    const today = new Date().toISOString().split('T')[0];

    const [date, setDate] = useState(today)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [tableBlog, setTableBlog] = useState(orderList);
    const [addActive, setActive] = useState('All');
    const OrderListData = (fiterItem) => {
        if (fiterItem === 'All') {
            setActive(fiterItem);
            setTableBlog(orderList)
        } else {
            setActive(fiterItem);
            let updateItems = orderList.filter((ele) => {
                return ele.status === fiterItem;
            });
            setTableBlog(updateItems)
        }
    }

    const buttonRef = useRef(null);
    const [orders, setOrders] = useState([]);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState(0);



    const [notify2, setNotify2] = useState(false);
    const audio = new Audio('./notification.wav');
        useEffect(() => {
            if(notify2){
                audio.play().catch(error => {
                console.error("Error playing sound:", error);
                });
                setNotify2(false)
            }
            
        }, [notify2]);
        useEffect(() => {
            let ws;
            let reconnectInterval;
          
            const connectWebSocket = () => {
              ws = new WebSocket('ws://180.188.226.29:8000/ws/orders/');
              setSocket(ws);
          
              // Handle incoming messages
              ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessage(data);
              };
          
              // Handle WebSocket connection open
              ws.onopen = () => {
                console.log('WebSocket connection established.');
                if (reconnectInterval) {
                  clearInterval(reconnectInterval);
                  reconnectInterval = null; // Clear any existing reconnection attempts
                }
              };
          
              // Handle WebSocket connection close
              ws.onclose = () => {
                console.log('WebSocket connection closed. Attempting to reconnect...');
                if (!reconnectInterval) {
                  reconnectInterval = setInterval(() => {
                    console.log('Reconnecting...');
                    connectWebSocket(); // Attempt to reconnect
                  }, 5000); // Retry every 5 seconds
                }
              };
          
              // Handle errors
              ws.onerror = (error) => {
                console.error('WebSocket error:', error);
              };
            };
          
            connectWebSocket();
          
            return () => {
              if (ws) ws.close(); // Close WebSocket on cleanup
              if (reconnectInterval) clearInterval(reconnectInterval); // Clear the reconnection interval
            };
          }, []);


    const [unchecked, setUnChecked] = useState(true);
    const handleChecked = (id) => {
        let temp = tableBlog.map((data) => {
            if (id === data.id) {
                return { ...data, inputchecked: !data.inputchecked };
            }
            return data;
        });
        setTableBlog(temp);
    };
    const handleCheckedAll = (value) => {
        let temp = tableBlog.map((data) => {
            return { ...data, inputchecked: value };
        });
        setTableBlog(temp);
        setUnChecked(!unchecked);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 10;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;
    const records = tableBlog.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableBlog.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleChange = (selectedOption) => {
        setDate("")
        setFiler(selectedOption);
      };
    
    const [newOrder, setNewOrder] = useState(false);
    const [newModel, setnewModel] = useState(false);

    const [
        getOrderListResponse,
        getOrderListError,
        getOrderListLoading,
        getOrderListFetch,
    ] = useAxios();
    const [
        changeOrderStatusResponse,
        changeOrderStatusError,
        changeOrderStatusLoading,
        changeOrderStatusFetch,
    ] = useAxios();
    const [
        orderMarkedAttendedResponse,
        orderMarkedAttendedError,
        orderMarkedAttendedLoading,
        orderMarkedAttendedFetch,
    ] = useAxios();

    const fetchOrderData = () => {
        getOrderListFetch(getOrderList({day:filter, date:date}))
    }
    const changeOrderStatusFunc = (status, uuid) => {
        changeOrderStatusFetch(ChangeOrderStatus({uuid:uuid, status:status}))
    }
    const OrderMarkedAttendedFunc = (uuid) => {
        orderMarkedAttendedFetch(orderMarkedAttended({uuid:uuid}))
    }
    const [selectedDate, setSelectedDate] = useState('');


    const handleDateChange = (event) => {
        setFiler(options[0])

      setSelectedDate(event.target.value); // Update state with the selected date
      console.log('Selected Date:', event.target.value); // Optional: Log the selected date
      setDate(event.target.value)
    };
  
    useEffect(() => {

        fetchOrderData()

    }, [filter, message, date])
    useEffect(() => {
        const intervalId = setInterval(() => {
          fetchOrderData();
        }, 200000);
      
        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
      }, []);

      const [isAnyUnattendedOrder, setAnyUnAttendedOrder]= useState(false)
      useEffect(()=>{
        let intervalId;
      
        if (isAnyUnattendedOrder) {
          // Start the interval when isAnyUnattendedOrder is true
          intervalId = setInterval(() => {
            if (buttonRef.current) {
              buttonRef.current.click();
            }
          }, 2000); // Click every second
        } else {
          // Clear the interval when isAnyUnattendedOrder becomes false
          clearInterval(intervalId);
        }
      
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      },[isAnyUnattendedOrder])
    useEffect(() => {
        if (getOrderListError?.response) {
            notify(getOrderListError?.response?.data, "error")
        }
    }, [getOrderListError])
    useEffect(() => {
        if (getOrderListResponse?.result == "success") {
            if(getOrderListResponse?.data?.length > orderList?.length ){
                buttonRef.current.click()
            }
            setOrderList(getOrderListResponse?.data)
            setTableBlog(getOrderListResponse?.data)
            const hasUnattendedOrders = getOrderListResponse?.data.some(order => order.is_attended === false);
            setAnyUnAttendedOrder(hasUnattendedOrders)
            console.log(getOrderListResponse?.data)
          
            
        }
    }, [getOrderListResponse])
    useEffect(() => {
        if (changeOrderStatusError?.response) {
            notify(changeOrderStatusError?.response?.data, "error")
        }
    }, [changeOrderStatusError])
    useEffect(() => {
        if (orderMarkedAttendedError?.response) {
            notify(orderMarkedAttendedError?.response?.data, "error")
        }
    }, [orderMarkedAttendedError])
    useEffect(() => {
        if (changeOrderStatusResponse?.result == "success") {
            notify(changeOrderStatusResponse?.message, "success")
            fetchOrderData()
        }
    }, [changeOrderStatusResponse])
    useEffect(() => {
        if (orderMarkedAttendedResponse?.result == "success") {
            notify(orderMarkedAttendedResponse?.message, "success")
            fetchOrderData()
        }
    }, [orderMarkedAttendedResponse])














    return (
        <div className="container">
            <div className="d-flex justify-content-between mb-4 flex-wrap">
                <ul className="revnue-tab nav nav-tabs" id="myTab" >
                <div>
    </div>
                    <li className='nav-item'
                        onClick={() => { OrderListData('All') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'All' ? 'active' : ''}`} >All Status</Link>
                    </li>
                    <li>
                  

                    </li>
                    <li className='nav-item'
                        onClick={() => { OrderListData('Ondelivery') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'Ondelivery' ? 'active' : ''}`} >On Delivery</Link>
                    </li>
                    <li className='nav-item'
                        onClick={() => { OrderListData('delivered') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'delivered' ? 'active' : ''}`}  >Delivered</Link>
                    </li>
                    <li className='nav-item'
                        onClick={() => { OrderListData('cancelled') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'cancelled' ? 'active' : ''}`} >Canceled</Link>
                    </li>
                    <li className='nav-item'
                        onClick={() => { OrderListData('pending') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'pending' ? 'active' : ''}`} >Pendings</Link>
                    </li>
                </ul>
           
            </div>
            <div className="d-flex justify-content-between mb-4 flex-wrap">
            <div className='d-flex align-items-center row'>
        <div className='col-lg-6 mt-2 col-md-4 col-sm-12'>
                <button className="btn btn-primary btn-lg btn-block" style={{
                    marginRight:"2rem"
                }}
                ref={buttonRef} 
                    onClick={()=>setNotify2(!notify2)}
                >
                  <i className="fa fa-bell-o"></i> Turn On Notification
                </button>
                </div>
                <div className='col-lg-3 mt-2 col-md-4 col-sm-12'>

                    <Select
                        
                        options={options}
                        className="custom-react-drop-btn custom-react-check"
                        value={filter}
                        isSearchable={false}
                        onChange={handleChange}
                    />
                    </div>

<div className='col-lg-3 mt-2 col-md-4 col-sm-12'>

                    <input type='date'
                    className='date-check-input-get'
                    value={selectedDate}
        onChange={handleDateChange} 
                    />
                    </div>

                </div>
           
            </div>
            
            <div className="row">
                <div className="col-xl-12">
                    <div className='tab-content'>
                        <div className='tab-pane fade active show'>
                            <div className="card mt-2">
                                <div className="card-body p-0">
                                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                                        <div id="orderlist-table" className="dataTables_wrapper no-footer">
                                            <table id="empoloyees-tbl" className="table dataTable no-footer">
                                                <thead>
                                                    <tr>
                                                        <th className="d-flex align-items-center sorting_asc_15">
                                                            <div className="form-check custom-checkbox ms-0">
                                                                <input type="checkbox" className="form-check-input checkAllInput" id="checkAll" required=""
                                                                    onClick={() => handleCheckedAll(unchecked)}
                                                                />
                                                                <label className="form-check-label" htmlFor="checkAll"></label>
                                                            </div>
                                                        </th>
                                                        <th>Order ID</th>
                                                        <th>Date</th>
                                                        <th>Location</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Attended</th>
                                                        <th>Action</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableBlog.map((item, index) => (
                                                        <tr key={index} style={{
                                                            background:!item?.is_attended && "#dbcc5a"
                                                        }}>
                                                            <td className="sorting_25">
                                                                <div className="form-check custom-checkbox">
                                                                    <input type="checkbox" className="form-check-input"
                                                                        required=""
                                                                        id={`order${item.id}`}
                                                                        checked={item.inputchecked}
                                                                        onChange={() => handleChecked(item.id)}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`order${item.id}`}></label>
                                                                </div>
                                                            </td>
                                                            <td><span><Link to={`/order-details/${item.uuid}`}>#{item.uuid}</Link></span></td>
                                                            <td><span>{formattedDate(item.ordered_at)}</span></td>
                                                            <td><span>{item?.address?.street}<br /><b>{item?.address?.city}</b></span></td>
                                                            <td><span>€ {item.total_amount}</span></td>
                                                            <td>
                                                                <span className={`badge badge-rounded badge-lg badge-outline ${getStatusBadgeClass(item.status)}`}>
                                                                    {getDataUsingStatus(item.status)}
                                                                </span>
                                                            </td>       
                                                            <td>
                                                                {!item?.is_attended &&
                                                            <Button variant="primary" onClick={()=>{
                                                                OrderMarkedAttendedFunc(item?.id)
                                                            }}>Mark as Attended</Button>
                                                        }
                                                               
                                                                </td>                                               
                                                                      <td style={{
                                                                        cursor:"pointer"
                                                                      }}>

                                                                <a onClick={()=>{
                                                                    setSelectedOrder(item)
                                                                    setnewModel(true)
                                                                }
                                                                }>View Details</a>

                                                            </td>

                                                            <td>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle as="div" className="i-false btn-link" data-bs-toggle="dropdown" >
                                                                        {SVGICON.ThreeDot}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right border py-0">
                                                                        <div className="py-2">
                                                                            <Link className="dropdown-item" onClick={()=>changeOrderStatusFunc("accepted",item.uuid)} >Accept</Link>
                                                                            <Link className="dropdown-item" onClick={()=>changeOrderStatusFunc("Ondelivery",item.uuid)} >On Delivery</Link>
                                                                            <Link className="dropdown-item" onClick={()=>changeOrderStatusFunc("delivered",item.uuid)} >Delivered</Link>
                                                                            <div className="dropdown-divider" />
                                                                            <Link className="dropdown-item text-danger" onClick={()=>changeOrderStatusFunc("cancelled",item.uuid)} >Cancel</Link>
                                                                        </div>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                                <div className='dataTables_info'>
                                                    Showing {lastIndex - recordsPage + 1} to{" "}
                                                    {orderList.length < lastIndex ? orderList.length : lastIndex}
                                                    {" "}of {orderList.length} entries
                                                </div>
                                                <div
                                                    className="dataTables_paginate paging_simple_numbers justify-content-center"
                                                    id="example2_paginate"
                                                >
                                                    <Link
                                                        className="paginate_button previous disabled"
                                                        to="#"
                                                        onClick={prePage}
                                                    >
                                                        <i className="fa-solid fa-angle-left" />
                                                    </Link>
                                                    <span>
                                                        {number.map((n, i) => (
                                                            <Link className={`paginate_button ${currentPage === n ? 'current' : ''} `} key={i}
                                                                onClick={() => changeCPage(n)}
                                                            >
                                                                {n}
                                                            </Link>
                                                        ))}
                                                    </span>
                                                    <Link
                                                        className="paginate_button next"
                                                        to="#"
                                                        onClick={nextPage}
                                                    >
                                                        <i className="fa-solid fa-angle-right" />
                                                    </Link>
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
            <Modal show={newOrder} onHide={setNewOrder} centered>
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title">Add Order</h5>
                        <button type="button" className="btn-close" onClick={() => setNewOrder(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Order ID</label>
                            <input type="number" className="form-control mb-3" id="exampleInputEmail1" placeholder="Order Id" />
                            <label className="form-label">Gmail</label>
                            <input type="email" className="form-control mb-3" id="exampleInputEmail2" placeholder=" Email" />
                            <label className="form-label">Amount</label>
                            <input type="number" className="form-control mb-3" id="exampleInputEmail3" placeholder="Amount" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => setNewOrder(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Done</button>
                    </div>
                </div>
            </Modal>
            <Modal show={newModel} onHide={setnewModel} centered>
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title">Order Details</h5>
                        <button type="button" className="btn-close" onClick={() => setnewModel(false)}></button>
                    </div>

                    <div className="card-body pt-2">
                        {selectedOrder?.order_items?.map((item, ind) => (
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
                                <li><h6>€ {selectedOrder?.total_amount}</h6></li>
                            </ul>
                            <ul className="d-flex align-items-center justify-content-between">
                                <li><span>Customer Details</span></li>
                                <li><h6><b>{selectedOrder?.user?.full_name}</b><br />{selectedOrder?.user?.phone_number}</h6></li>
                            </ul>
                            <ul className="d-flex align-items-center justify-content-between">
                                <li><span>Full Address</span></li>
                                <li><h6>{selectedOrder?.address?.street}<br />{selectedOrder?.address?.city}<br/>{selectedOrder?.address?.zip_code}</h6></li>
                            </ul>
                           
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => setnewModel(false)}>Close</button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />

        </div>

    );
};

export default OrderList;