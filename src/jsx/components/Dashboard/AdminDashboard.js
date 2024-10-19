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
import { DashboardFunction } from "../../../urls/urls";

const RevenueChart = loadable(() =>
  pMinDelay(import("./elements/RevenueChart"), 500)
);

const iconBoxcard = [
  { title: "Total Orders", number: "683", icon: SVGICON.DashHome },
  { title: "Total Revenue", number: "$4,982", icon: SVGICON.MessagePing },
  { title: "Total Customer", number: "12,094", icon: SVGICON.DoubleUser },
];
const progressData = [
  {
    title: "On Delivery",
    data: "6,245",
    color: "bg-primary",
    status: "30%",
    iconColoe: "#3B42F0",
  },
  {
    title: "Delivered",
    data: "2,355",
    color: "bg-success",
    status: "50%",
    iconColoe: "#4FD66E",
  },
  {
    title: "Canceled",
    data: "9,456",
    color: "bg-warning",
    status: "20%",
    iconColoe: "#FF8D0E",
  },
];
const notify = () => toast.success("Wow so easy!");

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
const AdminDashboard = () => {

	const [
		homeDashboardResponse,
		homeDashboardError,
		homeDashboardLoading,
		homeDashboardFetch,
	  ] = useAxios();
	
	  useEffect(()=>{
		if(homeDashboardError){
			notify(homeDashboardError?.response?.data, "error")
		}
	  },[homeDashboardError])
	  useEffect(()=>{
		if(homeDashboardResponse?.result == "success"){
			
		}
	  },[homeDashboardResponse])
	  useEffect(()=>{
      fetchData()
	  },[])
    const fetchData = () => {
      homeDashboardFetch(DashboardFunction())
    }
  const { changeBackground } = useContext(ThemeContext);
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

  const [activeKey, setActiveKey] = useState("closed");
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // State to track which action is pending

  const handleSelect = (eventKey) => {
    setPendingAction(eventKey); // Set which tab the user is trying to select
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirm = () => {
    if (pendingAction) {
      setActiveKey(pendingAction); // Set the active tab to the pending action
      console.log(`${pendingAction} action confirmed!`); // Perform your action here
      setPendingAction(null); // Clear the pending action
    }
    setShowModal(false); // Hide the modal
  };

  return (
    <>
      <div className="container mh-auto">
        <div className="row">
          {iconBoxcard.map((item, ind) => (
            <div className="col-xl-3 col-sm-1" key={ind}>
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
          <div className="col-xl-3 col-sm-1">
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
          <div className="col-xl-6 custome-width">
            <div className="card">
              <RevenueChart />
            </div>
          </div>
          <div className="col-xl-6 custome-width">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.dolor sit
                  amet, consectetur adipiscing elit
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
                            style={{ width: item.status, height: "13px" }}
                          >
                            <span className="sr-only">60% Complete</span>
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
                            ${item.data}
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
export default AdminDashboard;
