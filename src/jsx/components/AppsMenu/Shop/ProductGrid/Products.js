import React  from "react";
import { Link } from "react-router-dom";
import {  Nav} from "react-bootstrap";
import { useState } from "react";


const Products = ({ product: { previewImg, title} }) => {

  
    // Set the default active key to 'open'

  
   
  
  return (
    <div className="col-xl-3 col-md-4 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
              <img className="img-fluid border-img" src={previewImg} alt="" />
            </div>
            <div className="new-arrival-content text-center mt-3">
              <h4>
                <Link to="/ecom-product-detail">{title}</Link>
              </h4>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products