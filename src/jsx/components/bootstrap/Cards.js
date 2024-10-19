import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";

import {Link} from 'react-scroll';
/// Image
import img1 from "../../../images/card/1.png";
import img2 from "../../../images/card/2.png";
import img3 from "../../../images/card/3.png";
/// Bootstrap
import { Row, Card, Col, Button, Nav, Tab } from "react-bootstrap";

const sidebarLink = [
  {title:'Vegeterian', to:''},
  {title:'Non-vegeterian', to:''},
  {title:'Salads', to:''},
  {title:'Snacks', to:''},
  {title:'dessert', to:''},
  {title:'Wines & beer', to:''},
  {title:'Drinks', to:''},
  {title:'Ice cream', to:''},
  {title:'Scoup', to:''} ,
  {title:'Coverage', to:''} ,
  {title:'Seafoods', to:''} ,
  {title:'Today Special', to:''} 
]
const UiCards = () => {
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <Fragment>      
      <div className="container ">
        <div className="element-area w-60 p-4">
          <div className="demo-view ">
            <div className="container-fluid pt-10 ps-10 pe-lg-10 pe-10">
            <div className="demo-right-inner dlab-scroll " id="right-sidebar">
                <h4 className="title">Categories Avilable</h4>
                  <ul className="navbar-nav " id="menu-bar">
                      {sidebarLink.map((item, ind)=>(
                        <li key={ind}>
                          <Link to={item.to}  smooth={true}
                            className={`scroll ${ind === activeLink ? 'active' :  ''} `}
                            activeClass="active"
                            spy={true}
                            onClick={()=>setActiveLink(ind)}
                          > 
                          <div className="w-30 p-2">{item.title} </div>
                            
                          </Link>
                        </li>
                      ))}                     
                  </ul>	
            </div>
            </div>
          </div>
        
        </div>    
      </div>
    </Fragment>
  );
};

export default UiCards;
