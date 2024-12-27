import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Select from "react-select";
import DottedMap from "dotted-map";
import { ToastContainer, toast } from 'react-toastify';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { SVGICON } from "../../constant/theme";
import OrderSummaryChart from "./elements/OrderSummaryChart";
import { Nav, Dropdown } from "react-bootstrap";
import useAxios from "../../../network/useAxios";
import { DashboardFunction, DashboardGraphFunction, getRestStatusFunction, changeRestStatusFunction } from "../../../urls/urls";

const RevenueChart = loadable(() =>
  pMinDelay(import("./elements/RevenueChart"), 500)
);

const notify = (message, status) => {
  if(status == "error"){
    toast.error(message);

  }
  else{
    toast.success(message);

  }
}

const options = [
  { value: "1", label: "Daily" },
  { value: "2", label: "Week" },
  { value: "3", label: "Month" },
];

function DropBtnBlog() {
  return (
    <>
      <ToastContainer          
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </>
  );
}
const Home = () => {
	const [graphData, setGraphData] = useState({})

  const progressData = [
    {
      title: "On Delivery",
      color: "bg-primary",
      status: (graphData?.on_delivery_percentage)?.toFixed(2),
      iconColoe: "#3B42F0",
    },
    {
      title: "Delivered",
      color: "bg-success",
      status: (graphData?.delivered_percentage)?.toFixed(2),
      iconColoe: "#4FD66E",
    },
    {
      title: "Canceled",
      color: "bg-warning",
      status: (graphData?.cancelled_percentage)?.toFixed(2),
      iconColoe: "#FF8D0E",
    },
  ];
	const [
		homeDashboardResponse,
		homeDashboardError,
		homeDashboardLoading,
		homeDashboardFetch,
	  ] = useAxios();
	const [
		getGraphDataResponse,
		getGraphDataError,
		getGraphDataLoading,
		getGraphDataFetch,
	  ] = useAxios();
	const [
		getRestStatusResponse,
		getRestStatusError,
		getRestStatusLoading,
		getRestStatusFetch,
	  ] = useAxios();
	const [
		changeRestStatusResponse,
		changeRestStatusError,
		changeRestStatusLoading,
		changeRestStatusFetch,
	  ] = useAxios();

	const [dashboardData, setDashboardData] = useState({})
  const fetchData = () => {
    homeDashboardFetch(DashboardFunction())
  }
  const getGraphData = () => {
    getGraphDataFetch(DashboardGraphFunction())
  }
  const getRestStatus = () => {
    getRestStatusFetch(getRestStatusFunction())
  }
  const changeRestStatus = (status) => {
    changeRestStatusFetch(changeRestStatusFunction({status:status}))
  }
	  useEffect(()=>{
		if(homeDashboardError?.response){
			notify(homeDashboardError?.response?.data, "error")
		}
	  },[homeDashboardError])
	  useEffect(()=>{
		if(homeDashboardResponse?.result == "success"){
			setDashboardData(homeDashboardResponse?.data)
		}
	  },[homeDashboardResponse])
	  useEffect(()=>{
		if(getGraphDataError?.response){
			notify(getGraphDataError?.response?.data, "error")
		}
	  },[getGraphDataError])
	  useEffect(()=>{
		if(getGraphDataResponse?.result == "success"){
			setGraphData(getGraphDataResponse?.data)
		}
	  },[getGraphDataResponse])
	  useEffect(()=>{
		if(getGraphDataError?.response){
			notify(getGraphDataError?.response?.data, "error")
		}
	  },[getGraphDataError])
	  useEffect(()=>{
		if(getRestStatusResponse?.result == "success"){
      if(getRestStatusResponse?.data){
        setActiveKey("open")
      }
      else{
        setActiveKey("closed")
      }
		}
	  },[getRestStatusResponse])
	  useEffect(()=>{
		if(changeRestStatusError?.response){
			notify(changeRestStatusError?.response?.data, "error")
		}
	  },[changeRestStatusError])
	  useEffect(()=>{
		if(changeRestStatusResponse?.result == "success"){
      getRestStatus()
		}
	  },[changeRestStatusResponse])



    useEffect(()=>{
      getGraphData()
      getRestStatus()
      fetchData()
	  },[])
  const { changeBackground } = useContext(ThemeContext);
  
const iconBoxcard = [
  { title: "Total Orders", number: dashboardData?.total_orders, icon: SVGICON.DashHome },
  { title: "Total Revenue", number: dashboardData?.data?.total_revenue, icon: SVGICON.MessagePing },
  { title: "Total Customer", number: dashboardData?.data?.total_customers, icon: SVGICON.DoubleUser },
];
  // useEffect(() => {
  //   changeBackground({ value: "light", label: "Light" });
  // });

  // svg map
  const map = new DottedMap({ height: 23, grid: "vertical" });
  map.addPin({
    lat: 40.73061,
    lng: -73.935242,
    svgOptions: { color: "#e9e9e9", radius: 0.35 },
  });

  const [activeKey, setActiveKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // State to track which action is pending

  const handleSelect = (eventKey) => {
    setPendingAction(eventKey); // Set which tab the user is trying to select
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirm = () => {
    if (pendingAction) {
      changeRestStatus(pendingAction)

      setPendingAction(null); // Clear the pending action
    }
    setShowModal(false); // Hide the modal
  };

  return (
    <>
      <div className="container mh-auto">
        <div className="row check-rest-item-1">
        <div className="col-xl-3 col-md-6 col-sm-1 hokahoi" >
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <div className="card-menu">
                    <span>Total Orders</span>
                    <h2 className="mb-0">{dashboardData?.total_orders}</h2>
                  </div>
                  <div className="icon-box icon-box-lg bg-primary-light">
                    {SVGICON.DashHome}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-1 hokahoi" >
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <div className="card-menu">
                    <span>Total Revenue</span>
                    <h2 className="mb-0">€&nbsp;{dashboardData?.total_revenue}</h2>
                  </div>
                  <div className="icon-box icon-box-lg bg-primary-light">
                    {SVGICON.MessagePing}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-1 hokahoi" >
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <div className="card-menu">
                    <span>Total Customer</span>
                    <h2 className="mb-0">{dashboardData?.total_customers}</h2>
                  </div>
                  <div className="icon-box icon-box-lg bg-primary-light">
                    {SVGICON.DoubleUser}
                  </div>
                </div>
              </div>
            </div>
          <div className="col-xl-3 col-md-6 col-sm-1 hokahoi">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div className="card-menu">
                  <span>Restaurant Status</span>
                  <div className="col-mb-2">
                    <Nav
                      as="ul"
                      className="nav nav-tabs dzm-tabs"
                      id="myTab"
                      role="tablist"
                      activeKey={activeKey}
                    >
                      <Nav.Item
                        as="li"
                        className="nav-item"
                        role="presentation"
                      >
                        <Nav.Link
                          as="button"
                          type="button"
                          eventKey="open"
                          onClick={() => handleSelect("open")}
                        >
                          Open
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link
                          as="button"
                          type="button"
                          eventKey="closed"
                          onClick={() => handleSelect("closed")}
                        >
                          Closed
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
          <div className="col-xl-12 custome-width">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h3 className="h-title">Order Summary</h3>
                <div className="d-flex align-items-center">
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
                <p style={{ width: "90%" }}>
                </p>
                <div className="row">
                  <div className="col-xl-6">
                    <div id="piechart"></div>
                    <OrderSummaryChart />
                  </div>
                  <div className="col-xl-6">
                    {progressData.map((item, index) => (
                      <div className="mb-4" key={index}>
                        <div className="progress">
                          <div
                            className={`progress-bar linear ${item.color}`}
                            style={{ width:`${item.status}%` , height: "13px" }}
                          >
                            <span className="sr-only">100% Complete</span>
                          </div>
                        </div>
                        <span className="d-flex align-items-center mt-2">
                          <span>
                            <svg
                              width="13"
                              height="14"
                              viewBox="0 0 13 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.420288"
                                width="13"
                                height="13"
                                rx="4"
                                fill={item.iconColoe}
                              />
                            </svg>{" "}
                            <span className="mb-0  text-dark">
                              {item.title}
                            </span>
                          </span>
                          <span className="ms-auto font-w600">
                            {item.status} %
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Action</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to {pendingAction}?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Home;
