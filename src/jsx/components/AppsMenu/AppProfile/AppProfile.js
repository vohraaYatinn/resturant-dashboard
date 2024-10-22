import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';


import profile from "../../../../images/profile/profile.png";
import { IMAGES } from "../../../constant/theme";
import customerImg from "../../../../images/customer/stock_user.png"
import useAxios from "../../../../network/useAxios";
import { getCustomerData, SingleCustomer } from "../../../../urls/urls";
import { ToastContainer, toast } from 'react-toastify';
import { test_url_images } from "../../../../config/environment";
import { formattedDate } from "../../../commonFunctions";


const galleryBlog = [
	{image: IMAGES.Profile3}, {image: IMAGES.Profile4},
	{image: IMAGES.Profile2}, {image: IMAGES.Profile4},
	{image: IMAGES.Profile3}, {image: IMAGES.Profile2},
];
const mediaBlog = [
	{image: IMAGES.Profile5, title:'Collection of textile samples'},
	{image: IMAGES.Profile6, title:'Collection of cloths samples'},
	{image: IMAGES.Profile7, title:'Collection of fabric samples'},
];
const initialState = false;

const reducer = (state, action) =>{
	switch (action.type){
		case 'sendMessage':
			return { ...state, sendMessage: !state.sendMessage }		
		case 'postModal':
			return { ...state, post: !state.post }
		case 'linkModal':
			return { ...state, link: !state.link }		
		case 'cameraModal':
			return { ...state, camera: !state.camera }		
		case 'replyModal':
			return { ...state, reply: !state.reply }
		default:
			return state	
	}	
}

const AppProfile = () => {
	const [customerDetail, setCustomerDetail] = useState([])

	const notify = (message, status) => {
        if (status == "error") {
            toast.error(message);
    
        }
        else {
            toast.success(message);
    
        }
    }
	const onInit = () => {		
	};  	
	const { customerId } = useParams();
    const [
        getOrderListResponse,
        getOrderListError,
        getOrderListLoading,
        getOrderListFetch,
    ] = useAxios();
	const fetchCustomerData = () => {
        getOrderListFetch(SingleCustomer({customerId:customerId}))
    }
	useEffect(()=>{
		if(customerId){
			fetchCustomerData()
		}
	},[customerId])
	useEffect(() => {
        if (getOrderListError?.response) {
            notify(getOrderListError?.response?.data, "error")
        }
    }, [getOrderListError])
    useEffect(() => {
        if (getOrderListResponse?.result == "success") {
            setCustomerDetail(getOrderListResponse?.data)            
        }
    }, [getOrderListResponse])

	const [state, dispatch] = useReducer(reducer, initialState);
	const [like, setLike] = useState(false);
	return (
		<Fragment>		  	
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="profile card card-body px-3 pt-3 pb-0">
							<div className="profile-head">
							<div className="photo-content ">
								<div className="cover-photo rounded" style={{
									background:"rgb(54,22,254)"
								}}></div>
							</div>
							<div className="profile-info">
								<div className="profile-photo">
									<img src={customerImg} className="img-fluid rounded-circle" alt="profile"/>
								</div>
								<div className="profile-details">
									<div className="profile-name px-3 pt-2">
										<h4 className="text-primary mb-0">{customerDetail?.full_name}</h4>
										<p>+351-{customerDetail?.phone_number}</p>
									</div>
									<div className="profile-email px-2 pt-2">
										<h4 className="text-muted mb-0">{customerDetail?.email}</h4>
										<p>Email</p>
									</div>
						
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-12">
						<div className="row">
							<div className="col-lg-6">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h5 className="text-primary">Recent Orders</h5>
									</div>	
									<div className="card-body pt-3">
										<div className="profile-news">
											{customerDetail?.user_order?.map((item, index)=>(
												<div className="media pt-3 pb-3" key={index}>
												<div className="media-body">
													<h6 className="m-b-5"><Link to="/post-details" className="text-black">#{item.uuid}</Link></h6>
												{item?.order_items.map((item)=>{
													return(
														<p className="mb-0">{item.quantity} x {item.item.name}</p>

													)
												})}
												<br/>
													<p className="mb-0">{formattedDate(item.ordered_at)}</p>
													<p className="mb-0"><b>€{item.total_amount}</b></p>
												</div>
											</div>
											))}											
										</div>
									</div>	
								</div>
							</div>	
							<div className="col-lg-6">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h5 className="text-primary">All Address</h5>
									</div>	
									<div className="card-body pt-3">
										<div className="profile-news">
											{customerDetail?.addresses?.map((item, index)=>(
												<div className="media pt-3 pb-3" key={index}>
													<div className="media-body">
														<h6 className="m-b-5"><Link to="/post-details" className="text-black">{item.name}</Link></h6>
														<p className="mb-0">{item.street}</p>
														<p className="mb-0"><b>{item.zip_code}</b></p>
													</div>
												</div>
											))}											
										</div>
									</div>	
								</div>
							</div>	
						
						</div>	
					</div>	
					
				</div>
			</div>
		  {/* send Modal */}
			  <Modal className="modal fade" show={state.sendMessage} onHide={()=>dispatch({type:'sendMessage'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Send Message</h5>
						<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'sendMessage'})}>
							
						</Button>
					</div>
					<div className="modal-body">
						<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({type:'sendMessage'}); }}>
							<div className="row">
								<div className="col-lg-6">
									<div className="form-group mb-3">
										<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
										<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="form-group mb-3">
										<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
										<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group mb-3">
										<label htmlFor="comment" className="text-black font-w600">Comment</label>
										<textarea rows={4} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-group mb-3">
										<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		  {/* Post Modal */}
			  <Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({type:'postModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Post</h5>
						<Button variant=""  type="button" className="close" data-dismiss="modal" onClick={() => dispatch({type:'postModal'})} >
							<span>×</span>
						</Button>
						
					</div>
					<div className="modal-body">
						<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
						<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
					</div>
				</div>
			</Modal>
			 {/* Link Modal */}
			  <Modal show={state.link}  className="modal fade post-input" id="linkModal" onHide={() => dispatch({type:'linkModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Social Links</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'linkModal'})}>
						</button>
					</div>
					<div className="modal-body">
						<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
						<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus-g" /></Link>
						<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin-in" /></Link>
						<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
						<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
						<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
						<Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
					</div>
				</div>
			</Modal>
			 {/* Camera Modal */}
			  <Modal show={state.camera}  className="modal fade" id="cameraModal" onHide={() => dispatch({type:'cameraModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Upload images</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'cameraModal'})}>
						</button>
					</div>
					<div className="modal-body">
						<div className="input-group mb-3">
								<span className="input-group-text">Upload</span>
							<div className="form-file">
								<input type="file" className="form-file-input"/>
							</div>
						</div>
					</div>
				</div>
			</Modal>
			 {/* Reply Modal */}
			  <Modal   show={state.reply}  className="modal fade" id="replyModal" onHide={()=>dispatch({type:'replyModal'})} centered>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Post Reply</h5>
						<button type="button" className="btn-close"  onClick={() => dispatch({type:'replyModal'})}></button>
					</div>
					<div className="modal-body">
						<form>
							<textarea className="form-control" rows="4">Message</textarea>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger light"  onClick={() => dispatch({type:'replyModal'})}>Close</button>
						<button type="button" className="btn btn-primary">Reply</button>
					</div>
				</div>
			</Modal>
			<ToastContainer/>
		</Fragment>
	  );
};

export default AppProfile;
