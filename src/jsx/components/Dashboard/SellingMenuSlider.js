import React from 'react';
import { IMAGES } from '../../constant/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper/modules';

import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const sliderData = [
    { image: IMAGES.menuitem1, name:'Chicken Roll', price:'52',},
    { image: IMAGES.menuitem2, name:'Chicken Grill', price:'78',},
    { image: IMAGES.menuitem3, name:'Chicken Wings', price:'62',},
    { image: IMAGES.menuitem4, name:'Masala Chicken', price:'47',},
    { image: IMAGES.menuitem6, name:'Fried Chicken', price:'69',},
    { image: IMAGES.menuitem2, name:'Chicken Roll', price:'57',},
];

const SellingMenuSlider = () => {
    return (
           
        <Swiper 
            className="mySwiper"
            spaceBetween={20}  
            slidesPerView={3}
            // loop= {true}
            autoplay= {{
                delay: 3000,
            }}
            modules={[Autoplay]}
            breakpoints= {{			
                300: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                416: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1788: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }}
        >
            {sliderData.map((item, index)=>(
                <SwiperSlide className="swiper-slide" key={index}>
                    <div className="card">
                        <div className="card-body selling-menu pt-0 px-0 pb-0">
                            <div className="card-media">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="media-data">
                                <div className="d-flex justify-content-between align-items-baseline">
                                    <div>
                                        <h4 className="mb-0">{item.name}</h4>
                                        <span>Apple Juice, Beef Roast</span>
                                    </div>
                                    <i className="fa-solid fa-heart ms-auto c-heart c-pointer"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-2 media-data">
                                <h4>${item.price}</h4>
                                <ul className="star-rating">
                                    <li><i className="fa fa-star"></i></li>{" "}
                                    <li><i className="fa fa-star"></i></li>{" "}
                                    <li><i className="fa fa-star"></i></li>{" "}
                                    <li><i className="fa-solid fa-star-half-stroke"></i></li>{" "}
                                    <li><i className="fa-solid fa-star-half-stroke"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="media-data card-footer order-now">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <div>
                                    <span><i className="fa-solid fa-location-dot me-2"></i>Bristol, Bristol</span>
                                    <div>
                                        <span className="me-1"><i className="fa-solid fa-bicycle me-2"></i>{15 + index} Min</span>
                                        <span className="ms-1"><i className="fas fa-bell me-2"></i>{18 + index } Min</span>
                                        
                                    </div>	
                                </div>
                                <Link to={"/ecom-product-detail"} className="btn btn-primary btn-sm">Order now</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SellingMenuSlider;