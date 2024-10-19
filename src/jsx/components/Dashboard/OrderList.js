import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { IMAGES } from '../../constant/theme';

import { SVGICON } from '../../constant/theme';
import useAxios from '../../../network/useAxios';
import { ChangeOrderStatus, getOrderList } from '../../../urls/urls';
import { ToastContainer, toast } from 'react-toastify';
import { formattedDate, getDataUsingStatus, getStatusBadgeClass } from '../../commonFunctions';
import { test_url_images } from '../../../config/environment';




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

    const fetchOrderData = () => {
        getOrderListFetch(getOrderList({day:filter}))
    }
    const changeOrderStatusFunc = (status, uuid) => {
        changeOrderStatusFetch(ChangeOrderStatus({uuid:uuid, status:status}))
    }
    useEffect(() => {
        fetchOrderData()
    }, [filter])
    useEffect(() => {
        if (getOrderListError?.response) {
            notify(getOrderListError?.response?.data, "error")
        }
    }, [getOrderListError])
    useEffect(() => {
        if (getOrderListResponse?.result == "success") {
            setOrderList(getOrderListResponse?.data)
            setTableBlog(getOrderListResponse?.data)
            
        }
    }, [getOrderListResponse])
    useEffect(() => {
        if (changeOrderStatusError?.response) {
            notify(changeOrderStatusError?.response?.data, "error")
        }
    }, [changeOrderStatusError])
    useEffect(() => {
        if (changeOrderStatusResponse?.result == "success") {
            notify(changeOrderStatusResponse?.message, "success")
            fetchOrderData()
        }
    }, [changeOrderStatusResponse])














    return (
        <div className="container">
            <div className="d-flex justify-content-between mb-4 flex-wrap">
                <ul className="revnue-tab nav nav-tabs" id="myTab" >
                    <li className='nav-item'
                        onClick={() => { OrderListData('All') }}
                    >
                        <Link to={"#"} className={`nav-link ${addActive === 'All' ? 'active' : ''}`} >All Status</Link>
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
                <div className='d-flex align-items-center'>
                    <Select
                        options={options}
                        className="custom-react-drop-btn"
                        value={filter}
                        isSearchable={false}
                        onChange={handleChange}
                    />

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
                                                        <th>Action</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableBlog.map((item, index) => (
                                                        <tr key={index}>
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
                                                            <td><span>$ {item.total_amount}</span></td>
                                                            <td>
                                                                <span className={`badge badge-rounded badge-lg badge-outline ${getStatusBadgeClass(item.status)}`}>
                                                                    {getDataUsingStatus(item.status)}
                                                                </span>
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
                                <li><span>Full Address</span></li>
                                <li><h6><b>{selectedOrder?.address?.street}</b><br />{selectedOrder?.address?.city}</h6></li>
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