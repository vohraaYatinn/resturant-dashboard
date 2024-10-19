import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Modal} from 'react-bootstrap';
import Select from 'react-select';

import { IMAGES, SVGICON } from '../../constant/theme';
import SellingMenuSlider from './SellingMenuSlider';
import ProjectOverviewChart from './elements/ProjectOverviewChart';

function  CardBlog ({color, icon, title, number}){
    return(       
        <div className={`card ${color}`}>
            <div className="card-body d-flex justify-content-between">
                <div className="card-menu">
                    <span className="text-white">{title}</span>
                    <h2 className="mb-0 text-white">{number}</h2>
                </div>
                <div className="icon-box icon-box-lg bg-white">
                    {icon}
                </div>
            </div>
        </div>        
    )
}

const orderSummary = [
    {number: '261',  title:'Order'},
    {number: '94',  title:'Delivery'},
    {number: '874',  title:'Delivered'},
    {number: '25',  title:'Canceled'},
];

const sellingMenus = [
    {image : IMAGES.favirate3, title:'Sweet Orange Juice from Magelang', category:'BEVERAGES'},
    {image : IMAGES.favirate1, title:'Spaghetti ltaliano With Mozarella cheese', category:'FOOD'},
    {image : IMAGES.favirate1, title:'Original Big Burger with Extra Spicy ', category:'DESSERT'},
    {image : IMAGES.favirate3, title:'Sweet Orange Juice from Magelang', category:'BEVERAGES'},
    {image : IMAGES.favirate4, title:'Medium Fresh Salad Less Sugar (All Fruits)', category:'DESSERT'},
    {image : IMAGES.favirate2, title:'Spaghetti ltaliano With Mozarella cheese', category:'FOOD'},
];

const menus = [
    {name:'All', title:'All Categories'},
    {name:'BEVERAGES', title:'Beverages'},
    {name:'FOOD', title:'Foods'},
    {name:'DESSERT', title:'Dessert'},   
];

const customerData = [
    {name:'Isabella Rossi', location:'Italian', image: IMAGES.profile25},
    {name:'Juan Martinez', location:'Spanish', image: IMAGES.profile1},
    {name:'Chihiro', location:'Japanese', image: IMAGES.profile17},
    {name:'Emre Öztürk', location:'Turkish', image: IMAGES.profile18},
    {name:'Priya Patel', location:'Indian', image: IMAGES.profile19},
];

const options = [
    { value: '1', label: 'Daily' },
    { value: '2', label: 'Week' },
    { value: '3', label: 'Month' },
]

const Analytics = () => {
    const [menuItem, setMenuItem] = useState(sellingMenus);
    const [active, setActive] = useState("All");
    const OrderMenu = (filterItem) =>{
        setActive(filterItem);
        if(filterItem==="All"){
            setMenuItem(sellingMenus);
            return false;
        }
        let updateItems = sellingMenus.filter((ele)=>{
            return ele.category === filterItem;
        });
        setMenuItem(updateItems); 
    }
    const [customModal, setCustomModal]	= useState(false);
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="card">
                        <div className="card-body d-flex align-items-center">
                            <div className="d-flex align-items-center me-3">
                                {SVGICON.DoubleWaves}
                                <div className="ms-3">
                                    <h3 className="h-title text-primary">Generate annualy report by Salero</h3>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo</span>
                                </div>	
                            </div>
                            <i className="fa-solid fa-arrow-right text-primary"></i>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">                   
                    <CardBlog  title= 'Status' number="683"  color = "bg-primary"  icon = {SVGICON.status}/>
                </div>
                <div className="col-xl-3 col-sm-6">
                    <CardBlog  title= 'Total Revenue' number="$56,234"  color = "bg-success"  icon = {SVGICON.CoinGroup}/>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row text-center">
                                {orderSummary.map((item, ind)=>(
                                    <div className="col-sm-3 col-6  sapreter" key={ind}>
                                        <div className="card-menu">
                                            <h2 className="mb-0">{item.number}</h2>
                                            <span className="text-nowrap">{item.title}</span>
                                        </div>
                                    </div>
                                ))}                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6">                
                    <CardBlog  title= 'Trending Menus' number="250"  color = "bg-secondary"  icon = {SVGICON.CardMessage}/>
                </div>
                <div className="col-xl-3 col-sm-6">                   
                    <CardBlog  title= 'Favorites Menus' number="458"  color = "bg-custome"  icon = {SVGICON.CardDoubleUser}/>
                </div>
                <div className="col-xl-6">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0 flex-wrap">
                                    <h3 className="h-title">Most Selling Menus</h3>
                                    <div className='d-flex align-items-center'>
                                        <Select 
                                            options={options}  
                                            className="custom-react-drop-btn" 
                                            defaultValue={options[0]}
                                            isSearchable={false}
                                        />
                                        <Dropdown className="custom-dropdown mb-0">
                                            <Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
                                                {SVGICON.DropDots}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item>Details</Dropdown.Item>
                                                <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="nav nav-pills selling-tab mb-3 justify-content-between">
                                        {menus.map((data, index)=>(
                                            <li className="nav-item"  onClick={() => { OrderMenu(data.name) }} key={index}>
                                                <button className={`nav-link ${active === data.name ? 'active' : ''}`}>{data.title}</button>
                                            </li>
                                        ))}        
                                        <li className="nav-item">
                                            <button className="nav-link" id="pills-disabled-tab"  data-bs-target="#pills-disabled"  disabled>More</button>
                                        </li>                                
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active">
                                            {menuItem.map((item, index)=>(
                                                <div className="row sell-menu-row" key={index}>
                                                    <div className="col-xl-3 col-sm-3">
                                                        <div className="menu-img">
                                                            <img src={item.image} alt="food" />
                                                        </div>	
                                                    </div>
                                                    <div className="col-xl-9 col-sm-9">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <span className="text-primary fs-12 font-w500">{item.category}</span>
                                                                <h6><Link to={"#"}>{item.title}</Link></h6>
                                                            </div>
                                                            <span className="badge bg-warning rounded badge-sm"><i className="fa-solid fa-star me-1"></i>4.8</span>
                                                        </div>
                                                        <ul className="menu-list">
                                                            <li><span className="font-w600">$8,6</span></li>
                                                            <li><span className="text-success font-w600">+1.2%</span></li>
                                                            <li>
                                                                <span>
                                                                   {SVGICON.CircleRight}
                                                                   {" "} <strong>456</strong> Served
                                                                </span>                                                            
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    {SVGICON.CircleRight}
                                                                    {" "} <strong>2 - 4 min</strong> cook
                                                                </span>                                                            
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}                                           
                                        </div>                                       
                                        <div className="tab-pane fade" id="pills-disabled"></div>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <Link to={"#"} className="btn btn-primary light">View More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card overflow-hidden">
                                <div className="card-header border-0 flex-wrap">
                                    <h3 className="h-title">Recent Customer</h3>
                                    <div>
                                        <Link to={"#"} className="btn btn-primary" onClick={()=>setCustomModal(true)}>+ New Customer</Link>
                                        <Dropdown className="custom-dropdown mb-0">
                                            <Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
                                                {SVGICON.DropDots}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                <Dropdown.Item >Details</Dropdown.Item>
                                                <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {customerData.map((item, index)=>(
                                            <div className="col-xl-4 col-sm-4 col-6  bdr" key={index}>
                                                <div className="recent-customer-media">
                                                    <div className="customer-media text-center">
                                                        <img src={item.image} alt="" className="avatar avatar-md" />
                                                        <h6>{item.name}</h6>
                                                        <span className="text-nowrap">{item.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                       
                                        <div className="col-xl-4 col-sm-4 col-6  bdr">
                                            <div className="recent-customer-media text-center">
                                                <div className="mb-2">
                                                    <img src={IMAGES.profile25} alt="pro1" className="avatar avatar-xs me-1" />
                                                    <img src={IMAGES.profile1} alt="pro2" className="avatar avatar-xs ms-1" />
                                                </div>
                                                <div className="mb-2">
                                                    <img src={IMAGES.profile17} alt="pro3" className="avatar avatar-xs me-1" />
                                                    <img src={IMAGES.profile18} alt="pro4" className="avatar avatar-xs ms-1" />
                                                </div>
                                                <Link to={"/app-profile-2"} className="btn-link font-w600">View More ...</Link>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card">                               
                                <ProjectOverviewChart />                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header pb-0 border-0">
                            <h3 className="h-title">Most Selling Menus</h3>
                        </div>
                        <div className="card-body border-0 pb-0">
                            <SellingMenuSlider />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={customModal} onHide={setCustomModal} centered>				
				<div className="modal-content">
					<div className="modal-header ">
						<h5 className="modal-title">Add Customer</h5>
						<button type="button" className="btn-close" onClick={()=>setCustomModal(false)}></button>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label className="form-label">Customer Name</label>
							<input type="text" className="form-control mb-3" id="exampleInputEmail1"  placeholder="Name" />
							<label className="form-label">Email</label>
							<input type="email" className="form-control mb-3" id="exampleInputEmail2"  placeholder=" Email" />
							<label className="form-label">Location</label>
							<input type="text" className="form-control mb-3" id="exampleInputEmail3"  placeholder="Location" />
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger light"  onClick={()=>setCustomModal(false)}>Close</button>
						<button type="button" className="btn btn-primary">Save</button>
					</div>
				</div>				
			</Modal>
        </div>
    );
};

export default Analytics;
