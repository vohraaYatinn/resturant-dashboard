import React,{useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Select from 'react-select';
import DottedMap from "dotted-map";  

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { IMAGES, SVGICON } from '../../constant/theme';
import OrderSummaryChart from './elements/OrderSummaryChart';
import { Nav, Dropdown, Modal, Tab } from 'react-bootstrap';

import MenuSlider from './MenuSlider';
import MenuTabData from './MenuTabData';


const RevenueChart = loadable(() =>
	pMinDelay(import("./elements/RevenueChart"), 500)
);

const iconBoxcard = [
	{title:'Total Orders', number:'683', icon: SVGICON.DashHome},
	{title:'Total Menus', number:'56,234', icon: SVGICON.GroupCoin},
	{title:'Total Revenue', number:'$4,982', icon: SVGICON.MessagePing},
	{title:'Total Customer', number:'12,094', icon: SVGICON.DoubleUser},
];
const progressData = [
	{title:'On Delivery', data:'6,245', color:'bg-primary', status:'30%', iconColoe:'#3B42F0'},
	{title:'Delivered', data:'2,355', color:'bg-success', status:'60%', iconColoe:'#4FD66E'},
	{title:'Canceled', data:'9,456', color:'bg-warning', status:'10%', iconColoe:'#FF8D0E'},
];

const customerBlog = [
	{title:'Washington Franklin', color1:'var(--primary)', color2:'bg-primary-light'},
	{title:'Franklin Avenue ', color1:'var(--secondary)', color2:'bg-secondary-light'},
	{title:'Arlington Avenue ', color1:'#3CD860', color2:'bg-success-light'},
	{title:'Lebanon Avenue ', color1:'#6E6E6E', color2:'bg-info-light'},
	{title:'Springfield Avenue ', color1:'var(--secondary)', color2:'bg-secondary-light'},
	{title:'South Franklin ', color1:'var(--primary)', color2:'bg-primary-light'},	
];

const recentBlog = [
	{ image: IMAGES.customer1, title:'James Sukardi'},
	{ image: IMAGES.customer2, title:'Melanie Subarjo'},
	{ image: IMAGES.customer3, title:'Kevin Sandjaja'},
	{ image: IMAGES.customer2, title:'James Sukardi'},
	{ image: IMAGES.customer3, title:'Sandjaja James'},
	{ image: IMAGES.customer1, title:'Kevin Sandjaja'},
];

const options = [
    { value: '1', label: 'Daily' },
    { value: '2', label: 'Week' },
    { value: '3', label: 'Month' },
]

function DropBtnBlog(){
	return(
		<>
			<Dropdown className="custom-dropdown mb-0">
				<Dropdown.Toggle className="btn sharp tp-btn dark-btn i-false" as="div" >
					{SVGICON.DropDots}
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu-right" align="end">
					<Dropdown.Item eventKey="All" >Details</Dropdown.Item>
					<Dropdown.Item className="text-danger" eventKey="All">Cancel</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}


const DashboardDark = () => {
	const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	const [customModal, setCustomModal]	= useState(false);
	
	// svg map
	const map = new DottedMap({ height: 23, grid: "vertical" });
	map.addPin({
	  lat: 40.73061,
	  lng: -73.935242,
	  svgOptions: { color: "#e9e9e9", radius: 0.35 }
	});
  
	const svgMap = map.getSVG({
	  radius: 0.35,
	  color: "#e9e9e9",
	  shape: "circle",
	  backgroundColor: "#23202f"
	});
	return(
		<>
			<div className='container'>			
				<div className="row">
					{iconBoxcard.map((item, ind)=>(
						<div className="col-xl-3 col-sm-6" key={ind}>
							<div className="card">
								<div className="card-body d-flex justify-content-between">
									<div className="card-menu">
										<span>{item.title}</span>
										<h2 className="mb-0">{item.number}</h2>
									</div>
									<div className="icon-box icon-box-lg bg-primary-light">
										{item.icon}
									</div>
								</div>
							</div>
						</div>
					))}
					<div className="col-xl-6 custome-width">
						<div className="card">					
							<RevenueChart />
						</div>
					</div>
					<div className="col-xl-6 custome-width">
						<div className="card">
							<div className="card-header border-0 pb-0">
								<h3 className="h-title">Order Summary</h3>
								<div className='d-flex align-items-center'>
									<Select 
										options={options}  
										className="custom-react-drop-btn" 
										defaultValue={options[0]}
										isSearchable={false}
									/>
									<DropBtnBlog />
								</div>
							</div>
							<div className="card-body ">
								<p 
									style={{width:"90%"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.dolor sit amet, consectetur adipiscing elit
								</p>
								<div className="row">
									<div className="col-xl-6">
										<div id="piechart"></div>
										<OrderSummaryChart />
									</div>
									<div className="col-xl-6">
										{progressData.map((item, index)=>(
											<div className="mb-4" key={index}>
												<div className="progress">		
													<div className={`progress-bar linear ${item.color}`} style={{width: item.status, height:"13px"}}>
														<span className="sr-only">60% Complete</span>
													</div>														
												</div>
												<span className="d-flex align-items-center mt-2">
													<span>
														<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect y="0.420288" width="13" height="13" rx="4" fill={item.iconColoe}/>
														</svg>{" "}
														<span className="mb-0  text-dark">{item.title}</span>
													</span>
													<span className="ms-auto font-w600">${item.data}</span>
												</span>
											</div>
										))}									
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>		
			</div>
			
		</>
	)
}
export default DashboardDark;