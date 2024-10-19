import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES, SVGICON } from '../../constant/theme';
import { Dropdown } from 'react-bootstrap';

const reviewCard = [
    {image: IMAGES.profile25, name:'Juan Martinez', location:'Spanish', followers:'42', reviews:'56', date:'15/08/2023',  },
    {image: IMAGES.profile17, name:'Chihiro Yamamoto', location:'Japanese', followers:'38', reviews:'86', date:'20/08/2023',  },
    {image: IMAGES.profile18, name:'Emre Öztürk', location:'Turkish', followers:'46', reviews:'74', date:'30/08/2023',  },
    {image: IMAGES.profile19, name:'Isabella Rossi', location:'Italian', followers:'50', reviews:'63', date:'08/09/2023',  },
    {image: IMAGES.profile1, name:'Alexandre Dupont', location:'French', followers:'29', reviews:'89', date:'17/09/2023',  },
    {image: IMAGES.profile18, name:'Priya Patel', location:'Indian', followers:'39', reviews:'95', date:'25/09/2023',  },
];

const Reviews = () => {
    return (
        <div className="container">
            <div className="row">
                {reviewCard.map((item, index)=>(
                    <div className="col-xl-12" key={index}>
                        <div className="card">
                            <div className="card-header justify-content-end border-0 pb-0">
                                <Dropdown>
                                    <Dropdown.Toggle as="div" className="btn-link i-false">
                                        {SVGICON.ThreeDot}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-right">
                                        <Dropdown.Item >Edit</Dropdown.Item>
                                        <Dropdown.Item >Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} alt={item.name} className="avatar avatar-md" />
                                            <div className="ms-3">
                                                <h6 className="mb-0"><Link to={"/app-profile-2"} className="text-primary">{item.name}</Link></h6>
                                                <h6>{item.location}</h6>
                                                <span>{item.followers} Followers, {item.reviews} Reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="d-flex">
                                            <ul className="star-rating s-rieview me-3">
                                                <li><i className="fa fa-star"></i></li>{" "}
                                                <li><i className="fa fa-star"></i></li>{" "}
                                                <li><i className="fa fa-star"></i></li>{" "}
                                                <li><i className="fa-solid fa-star-half-stroke"></i></li>{" "}
                                                <li><i className="fa-solid fa-star-half-stroke"></i></li>
                                            </ul>
                                            <span>25/05/2023</span>
                                        </div>
                                        <p className="review">We recently had dinner with friends at Dimas Can Zheng and we all walked away with a great experience. Good food, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!</p>
                                        <div className="d-flex justify-content-between flex-wrap align-items-center">
                                            <div className="sm-mb-0 mb-2">
                                                <Link to={"#"} className="btn btn-primary light me-1">PUBLIC COMMENT</Link>
                                                <Link to={"#"} className="btn btn-primary light ms-1">DIRECT MESSAGE</Link>
                                            </div>
                                            <Link to={"#"} className="btn btn-primary ms-1">REPLY</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;