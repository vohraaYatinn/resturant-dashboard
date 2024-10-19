import React,{useState, useEffect} from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoutPage from './Logout';
import { IMAGES, SVGICON } from "../../constant/theme";
import customerImg from "../../../images/customer/stock_user.png"


const NotificationBlog =({classChange}) =>{
	return(
		<>
		</>
		// <>
		// 	<li>
		// 		<div className="timeline-panel">
		// 			<div className="media me-2">
		// 				<img alt="images" width={50} src={IMAGES.Avatar} />
		// 			</div>
		// 			<div className="media-body">
		// 				<h6 className="mb-1">Dr sultads Send you Photo</h6>
		// 				<small className="d-block">29 July 2022 - 02:26 PM</small>
		// 			</div>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<div className="timeline-panel">
		// 			<div className={`media me-2 ${classChange}`}>KG</div>
		// 			<div className="media-body">
		// 				<h6 className="mb-1">Resport created successfully</h6>
		// 				<small className="d-block">29 July 2022 - 02:26 PM</small>
		// 			</div>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<div className="timeline-panel">
		// 			<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
		// 			<div className="media-body">
		// 				<h6 className="mb-1">Reminder : Treatment Time!</h6>
		// 				<small className="d-block">29 July 2022 - 02:26 PM</small>
		// 			</div>
		// 		</div>
		// 	</li>
		// </>
	)
}

const Header = ({ onNote }) => {
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 
	

	
	var path = window.location.pathname.split("/");
	var name = path[path.length - 1].split("-");
	var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
	var finalName = filterName.includes("app")
	  ? filterName.filter((f) => f !== "app")
	  : filterName.includes("ui")
	  ? filterName.filter((f) => f !== "ui")
	  : filterName.includes("uc")
	  ? filterName.filter((f) => f !== "uc")
	  : filterName.includes("basic")
	  ? filterName.filter((f) => f !== "basic")
	  : filterName.includes("jquery")
	  ? filterName.filter((f) => f !== "jquery")
	  : filterName.includes("table")
	  ? filterName.filter((f) => f !== "table")
	  : filterName.includes("page")
	  ? filterName.filter((f) => f !== "page")
	  : filterName.includes("email")
	  ? filterName.filter((f) => f !== "email")
	  : filterName.includes("ecom")
	  ? filterName.filter((f) => f !== "ecom")
	  : filterName.includes("chart")
	  ? filterName.filter((f) => f !== "chart")
	  : filterName.includes("editor")
	  ? filterName.filter((f) => f !== "editor")
	  : filterName;
  return ( 
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          	<div className="collapse navbar-collapse justify-content-between">
				<div className="header-left">		
					<div
						className="dashboard_bar"
						style={{ textTransform: "capitalize" }}
					>
						{finalName.join(" ").length === 0
						? "Dashboard"
						: finalName.join(" ") === "dashboard dark"
						? "Dashboard"
						: finalName.join(" ")}
					</div>				
				</div>
				<div className="header-right d-flex align-items-center">
					
					<ul className="navbar-nav ">	
						
						<Dropdown as="li" className="nav-item dropdown notification_dropdown">
							<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
								{SVGICON.BellIcon}		
								{/* <span className="badge light text-white bg-primary rounded-circle">18</span>				 */}
							</Dropdown.Toggle>
							<Dropdown.Menu align="end" className="mt-2 dropdown-menu dropdown-menu-end">
								<div className="widget-media dz-scroll p-3 height380">
									<ul className="timeline">
										<NotificationBlog classChange='media-info'/>
										<NotificationBlog classChange='media-success' />
										<NotificationBlog classChange='media-danger' />
										<NotificationBlog classChange='media-info' />
									</ul>
									<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
										<div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }}/>
									</div>
									<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
										<div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }}/>
									</div>
								</div>
								<Link className="all-notification" to="#">
									See all notifications <i className="ti-arrow-right" />
								</Link>
							</Dropdown.Menu>
						</Dropdown>	
						
						{/* <Dropdown as="li" className="nav-item dropdown notification_dropdown ">
							<Dropdown.Toggle variant="" as="a" className="nav-link   i-false c-pointer" role="button">
								{SVGICON.CalenderIcon}
							</Dropdown.Toggle>
							<Dropdown.Menu  className=" dropdown-menu dropdown-menu-end" align="end">
								<div className="widget-timeline dz-scroll style-1 p-3 ps--active-y height370" id="DZ_W_TimeLine02">								
									<ul className="timeline">
										<li>
											<div className="timeline-badge primary" />
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>10 minutes ago</span>
												<h6 className="mb-0"> Youtube, a video-sharing website, goes live{" "} <strong className="text-primary">$500</strong>.</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge info"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>20 minutes ago</span>
												<h6 className="mb-0">
													New order placed{" "}
													<strong className="text-info">#XF-2356.</strong>
												</h6>
												<p className="mb-0"> Quisque a consequat ante Sit amet magna at volutapt...</p>
											</Link>
										</li>
										<li>
											<div className="timeline-badge danger"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>30 minutes ago</span>
											<h6 className="mb-0">
												john just buy your product{" "}
												<strong className="text-warning">Sell $250</strong>
											</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge success"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
											<span>15 minutes ago</span>
											<h6 className="mb-0">
												StumbleUpon is acquired by eBay.{" "}
											</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge warning"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
											<span>20 minutes ago</span>
											<h6 className="mb-0">
												Mashable, a news website and blog, goes live.
											</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge dark"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>20 minutes ago</span>
												<h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge primary" />
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>10 minutes ago</span>
												<h6 className="mb-0"> Youtube, a video-sharing website, goes live{" "} <strong className="text-primary">$500</strong>.</h6>
											</Link>
										</li>
											<li>
											<div className="timeline-badge info"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
												<span>20 minutes ago</span>
												<h6 className="mb-0">
													New order placed{" "}
													<strong className="text-info">#XF-2356.</strong>
												</h6>
												<p className="mb-0"> Quisque a consequat ante Sit amet magna at volutapt...</p>
											</Link>
										</li>
										<li>
											<div className="timeline-badge danger"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
											<span>30 minutes ago</span>
											<h6 className="mb-0">
												john just buy your product{" "}
												<strong className="text-warning">Sell $250</strong>
											</h6>
											</Link>
										</li>
										<li>
											<div className="timeline-badge success"></div>
											<Link className="timeline-panel c-pointer text-muted" to="#">
											<span>15 minutes ago</span>
											<h6 className="mb-0">
												StumbleUpon is acquired by eBay.{" "}
											</h6>
											</Link>
										</li>
									</ul>
									<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
										<div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }}/>
									</div>
									<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
										<div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }}/>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>	 */}
						<li className="nav-item ps-3">
							<Dropdown className="header-profile2">
								<Dropdown.Toggle className="nav-link i-false" as="div">
									<div className="header-info2 d-flex align-items-center">
										<div className="header-media">
											<img src={customerImg} alt="" />
										</div>										
										
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end">
									<div className="card border-0 mb-0">
										<div className="card-header py-2">
											<div className="products">
												
												<div>
													<h6>OS MAGALHAES</h6>
													<span>RESTAURANT ADMIN</span>	
												</div>	
											</div>
										</div>
										
										<div className="card-footer px-0 py-2">
											<Link to={"/dashboard"} className="dropdown-item ai-icon ">
												{SVGICON.Headersetting} {" "}
												<span className="ms-2">Dashboard </span>
											</Link>										
											<LogoutPage />
										</div>
									</div>
									
								</Dropdown.Menu>
							</Dropdown>
						</li>						
					</ul>
				</div>
			
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
