import React,{useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import { IMAGES, SVGICON } from '../../constant/theme';
import { Dropdown, Tab, Nav, Modal } from 'react-bootstrap';
import InactiveTab from './elements/InactiveTab';
import AppProfile from '../AppsMenu/AppProfile/AppProfile';
import useAxios from '../../../network/useAxios';
import { getCustomerData, BanUnbanCustomer } from '../../../urls/urls';
import { ToastContainer, toast } from 'react-toastify';
import { formattedDate } from '../../commonFunctions';
import { test_url_images } from '../../../config/environment';
import customerImg from "../../../images/customer/stock_user.png"



const options = [
    { value: '1', label: 'Daily' },
    { value: '2', label: 'Week' },
    { value: '3', label: 'Month' },
]

const Customers = () => {
    const notify = (message, status) => {
        if (status == "error") {
            toast.error(message);
    
        }
        else {
            toast.success(message);
    
        }
    }
    
    const [orderList, setOrderList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const [
        getOrderListResponse,
        getOrderListError,
        getOrderListLoading,
        getOrderListFetch,
    ] = useAxios();
    const [
        makeUserResponse,
        makeUserError,
        makeUserLoading,
        makeUserFetch,
    ] = useAxios();
    const fetchCustomerData = () => {
        getOrderListFetch(getCustomerData({search:searchQuery}))
    }
    const DEBOUNCE_DELAY = 500; // 500ms delay

    useEffect(() => {
        if (searchQuery == "" || !searchQuery){
            fetchCustomerData(); 
        }
        const handler = setTimeout(() => {
            if (searchQuery) {
                fetchCustomerData(); // Call the function when searchQuery changes
            }
        }, DEBOUNCE_DELAY);
      
        // Cleanup the timeout if searchQuery changes or component unmounts
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
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
        if (makeUserError?.response) {
            notify(makeUserError?.response?.data, "error")
        }
    }, [makeUserError])
    useEffect(() => {
        if (makeUserResponse?.result == "success") {
            notify(makeUserResponse?.message, "success")
            fetchCustomerData()
        }
    }, [makeUserResponse])
    const [data, setData] = useState(
		document.querySelectorAll("#orderlist-table tbody tr")
	);
	const sort = 10;
	const activePag = useRef(0);
	const [test, settest] = useState(0);
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   
   useEffect(() => {
      setData(document.querySelectorAll("#orderlist-table tbody tr"));
	}, [test]);

   activePag.current === 0 && chageData(0, sort);
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
   
    const checkboxFun = (type) => {
        setTimeout(() => {
            const checkbox = document.querySelectorAll(".sorting_25 input");
            const motherCheckBox = document.querySelector(".sorting_asc_15 input");
            for (let i = 0; i < checkbox.length; i++) {
                const element = checkbox[i];
                if (type === "all") {
                    if (motherCheckBox.checked) {
                        element.checked = true;
                    } else {
                     element.checked = false;
                    }
                } else {
                    if (!element.checked) {
                    motherCheckBox.checked = false;
                    break;
                    } else {
                        motherCheckBox.checked = true;
                    }
                }
            }
        }, 100);
    };
    const makeUserInactive = (id) =>{
        makeUserFetch(BanUnbanCustomer({
            userId:id
        }))
    }

    const [customModal, setCustomModal]	= useState(false);
    return (
        <div className="container">
            <Tab.Container defaultActiveKey={'Active'}>
            <div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Customer Name / Email / Phone Number..." onChange={(e)=>setSearchQuery(e.target.value)}/>
						<span className="input-group-text">
							<Link to={"#"}>
								{SVGICON.SearchIcon}
							</Link>
						</span>
					</div>

                <div className="row">
                    <div className="col-xl-12">
                        <Tab.Content>
                            <Tab.Pane eventKey={'Active'}>
                                <div className="card mt-2">
                                    <div className="card-body p-0">
                                        <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                                            <div id="orderlist-table" className="dataTables_wrapper no-footer">
                                                <table id="empoloyees-tbl" className="table dataTable no-footer">
                                                    <thead>
                                                        <tr>
                                                           
                                                            <th>S No.</th>
                                                            <th>Customers</th>
                                                            <th>Join Date</th>
                                                            <th>Phone</th>
                                                            <th>Email</th>
                                    
                                                            <th>Location</th>
                                                            <th>Total Orders</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderList.map((item, index)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <span>{index+1}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <img src={item.image ? test_url_images + item.image : customerImg} className="avatar avatar-xxs rounded" alt="" />
                                                                        <p className="mb-0 ms-2">
                                                                            <a ><Link to={"/app-profile/"+item.id}>{item.full_name}</Link></a>
                                                                            </p>	
                                                                    </div>
                                                                </td>
                                                            
                                                                <td><span>{formattedDate(item.ordered_at)}</span></td>
                                                                <td><span>{item.phone_number}</span></td>
                                                                <td><span>{item.email}</span></td>
                                                                
                                                                <td><span>{item.active_addresses?.[0]?.city}<br/>{item.active_addresses?.[0]?.zip_code}</span></td>                                                        
                                                                <td><span>{item.total_orders}</span></td>                                                        
                                                                <td><span style={{
                                                                    color:item.is_active ? "green" :"red"
                                                                }}>{item.is_active ? "Active" : "Inactive"}</span></td>                                                        

                                                                <td>
                                                                    <Dropdown className="dropdown">
                                                                        <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                            {SVGICON.ThreeDot}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu className="dropdown-menu-right">
                                                                            <Dropdown.Item  className='text-danger'
                                                                            onClick={()=>makeUserInactive(item.id)}
                                                                            >{item.is_active ? "Make it inactive" : "Make it active"}</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody> 
                                                </table>   
                                                <div className="d-sm-flex text-center justify-content-between align-items-center">
                                                    <div className="dataTables_info">
                                                        Showing {activePag.current * sort + 1} to{" "}
                                                        {data.length > (activePag.current + 1) * sort
                                                            ? (activePag.current + 1) * sort
                                                            : data.length}{" "}
                                                        of {data.length} entries
                                                    </div>
                                                    <div
                                                        className="dataTables_paginate paging_simple_numbers justify-content-center"
                                                        id="example2_paginate"
                                                    >
                                                        <Link
                                                            className="paginate_button previous disabled"
                                                            to="#"
                                                            onClick={() =>
                                                            activePag.current > 0 &&
                                                            onClick(activePag.current - 1)
                                                            }
                                                        >
                                                            
                                                            Prev
                                                        </Link>
                                                        <span>
                                                            {paggination.map((number, i) => (
                                                            <Link
                                                                key={i}
                                                                to="#"
                                                                className={`paginate_button  ${
                                                                    activePag.current === i ? "current" : ""
                                                                } `}
                                                                onClick={() => onClick(i)}
                                                            >
                                                                {number}
                                                            </Link>
                                                            ))}
                                                        </span>
                                                        <Link
                                                            className="paginate_button next"
                                                            to="#"
                                                            onClick={() =>
                                                            activePag.current + 1 < paggination.length &&
                                                                onClick(activePag.current + 1)
                                                            }
                                                        >
                                                            Next
                                                        </Link>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            </Tab.Pane>     
                            <Tab.Pane eventKey={'Inactive'}>
                                <InactiveTab />
                            </Tab.Pane>  
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        
            <ToastContainer/>
        </div>
    );
};

export default Customers;