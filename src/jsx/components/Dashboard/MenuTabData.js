import React from 'react';
import {Link} from 'react-router-dom';

import favirate1 from './../../../images/favirate-img/1.png';
import favirate2 from './../../../images/favirate-img/2.png';
import { SVGICON } from '../../constant/theme';

const MenuTabData = () => {
    return (
        <div className="row">
            <div className="col-xl-8 col-md-7 col-sm-6">
                <div className="fav-box">
                    <div className="fav-media" style={{backgroundImage: 'url('+ favirate1 +')'}}>
                        <ul className="dz-badge-list">
                            <li>
                                <Link to={"#"} className="badge badge-warning badge-sm">
                                    {SVGICON.StarYellow}
                                    <span className="fav-tag">4.8</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="dz-info-list">
                            <li>
                                <Link to={"/ecom-product-detail"} className="title font-w700 text-white">Spaghetti Italiano With Mozarella Cheese</Link>
                                <p className="text-white mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                            </li>
                            <ul className="d-flex align-items-center justify-content-between mb-3">
                                <li className="text-success">
                                    {SVGICON.CircleRight}{" "}
                                    456 Served
                                </li>	
                                <li><h3 className="text-white mb-0">$95</h3></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-md-5 col-sm-6">
                <div className="fav-box">
                    <div className="fav-media" style={{backgroundImage: 'url('+ favirate2 +')'}}>
                        <ul className="dz-badge-list">
                            <li>
                                <Link to={"#"} className="badge badge-warning badge-sm">
                                    {SVGICON.StarYellow}
                                    <span className="fav-tag">4.8</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="dz-info-list">
                            <li>
                                <Link to={"/ecom-product-detail"} className="title font-w700 text-white">Baked Bread with Ice Cream</Link>
                                <p className="text-white mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </li>
                            <ul className="d-flex align-items-center justify-content-between mb-3">
                                <li className="text-success">
                                    {SVGICON.CircleRight}{" "}
                                    456 Served
                                </li>	
                                <li><h3 className="text-white mb-0">$86</h3></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MenuTabData;