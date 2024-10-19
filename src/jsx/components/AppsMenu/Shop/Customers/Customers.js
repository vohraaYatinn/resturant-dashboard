import React, { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

/// images
import avartar5 from "../../../../../images/avatar/5.png";
import avartar1 from "../../../../../images/avatar/1.png";
import { Link } from "react-router-dom";


const tableData = [
   { id:'1', image : avartar1, title:'Ricky Antony'},
   { id:'2', image : avartar5, title:'Emma Watson'},
   { id:'3', image : avartar1, title:'Rowen Atkinson'},
   { id:'4', image : avartar5, title:'Antony Hopkins'},
   { id:'5', image : avartar1, title:'Jennifer Schramm'},
   { id:'6', image : avartar5, title:'Raymond Mims'},
   { id:'7', image : avartar1, title:'Kristine Cadena'},
   { id:'8', image : avartar5, title:'Rowen Atkinson'},
   { id:'9', image : avartar1, title:'Raymond Mims'},
   { id:'10', image : avartar5, title:'Jennifer Schramm'},
   { id:'11', image : avartar1, title:'Emma Watson'},
   { id:'12', image : avartar5, title:'Antony Hopkins'},
   { id:'13', image : avartar1, title:'Kristine Cadena'},
   { id:'14', image : avartar5, title:'Ricky Antony'},
];

const Customers = () => {
   const drop = (
      <Dropdown>
         <Dropdown.Toggle as="div" variant="" className="btn btn-primary tp-btn-light sharp i-false">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
               <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="19" cy="12" r="2"></circle>
               </g>
            </svg>
         </Dropdown.Toggle>
         <Dropdown.Menu>
            <Dropdown.Item href="#">Edit</Dropdown.Item>
            <Dropdown.Item href="#" className="text-danger">
               Delete
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
   const [checkAll, setCheckAll] = useState(false);
   const [unchecked, setUnChecked] = useState(true);
   const [checked, setChecked] = useState(tableData);
    const handleChecked = (id)=> {
      let temp = checked.map((data) => {
         if (id === data.id) {
            return { ...data, inputchecked: !data.inputchecked };
         }
         return data;
      });
      setChecked(temp);
      
   };

   useEffect(() => {
      var x = 0;
      checked.map((data) => {
         if(data.inputchecked){
            x++;
         }
      })
      if(x === checked.length){
         setCheckAll(true);
      }else{
         setCheckAll(false);
      }       
   },[checked])

   const handleCheckedAll = (value)=> {
      setCheckAll(value)      
       let temp = checked.map((data) => {          
           return { ...data, inputchecked: value };   
       });
       setChecked(temp);
       setUnChecked(!unchecked);
   };

   return (
      <Fragment>
         <div className="container mh-auto">
            <div className="row">
               <div className="col-lg-12">
                  <div className="card">
                     <div className="card-body">
                        <div className="table-responsive">
                           <table className="table table-sm mb-0 table-striped student-tbl">
                              <thead>
                                 <tr>
                                    <th className="customer_shop ">
                                       <div className="form-check custom-checkbox mx-2">
                                          <input
                                             type="checkbox"
                                             className="form-check-input"
                                             id="checkAll"   
                                             checked={checkAll}
                                             onChange={(e)=>handleCheckedAll(e.target.checked)}                                                                                  
                                          />
                                          <label
                                             className="form-check-label"
                                             htmlFor="checkAll"
                                          ></label>
                                       </div>
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th className="ps-5 width200" >
                                       Billing Address
                                    </th>
                                    <th>Joined</th>
                                    <th className="text-end">Action</th>
                                 </tr>
                              </thead>
                              <tbody id="customers">
                                 {checked.map((item, ind)=>(
                                    <tr className="btn-reveal-trigger" key={ind}>
                                       <td className="customer_shop_single py-2">
                                          <div className={`form-check custom-checkbox ms-2`}>
                                             <input
                                                type="checkbox"
                                                className="form-check-input "                                                
                                                id={`cust-${item.id}`}
                                                // checked={item.inputchecked}
                                                checked={item.inputchecked}
                                                onChange={()=>handleChecked(item.id)}
                                             />
                                             <label
                                                className="form-check-label"
                                                htmlFor={`cust-${item.id}`}
                                             ></label>
                                          </div>
                                       </td>
                                       <td className="py-3">
                                          <Link to="/ecom-customers">
                                             <div className="media d-flex align-items-center">
                                                <div className="avatar avatar-sm  me-2">
                                                   <div className="">
                                                      <img
                                                         className="rounded-circle img-fluid"
                                                         src={item.image}
                                                         width="30"
                                                         alt=""
                                                      />
                                                   </div>
                                                </div>
                                                <div className="media-body">
                                                   <h5 className="mb-0 fs--1">
                                                      {item.title}
                                                   </h5>
                                                </div>
                                             </div>
                                          </Link>
                                       </td>
                                       <td className="py-2">
                                          <a href="mailto:ricky@example.com">
                                             info@example.com
                                          </a>
                                       </td>
                                       <td className="py-2">
                                          {" "}
                                          <a href="tel:2012001851">(201) 200-1851</a>
                                       </td>
                                       <td className="py-2 ps-5 ">
                                          2392 Main Avenue, Penasauka
                                       </td>
                                       <td className="py-2">30/03/2023</td>
                                       <td className="py-2 text-end">{drop}</td>
                                    </tr>
                                 ))}                               
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Customers;
