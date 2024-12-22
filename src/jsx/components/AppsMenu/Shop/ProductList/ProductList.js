import React, { act, Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Nav} from "react-bootstrap";
import Select from 'react-select';

// images
import { IMAGES } from "../../../../constant/theme";
import useAxios from "../../../../../network/useAxios";
import { changeaddOn, changeBuyonegetone, changeMenuAvailablility, getCategoriesData } from "../../../../../urls/urls";
import { ToastContainer, toast } from 'react-toastify';
import { test_url_images } from "../../../../../config/environment";


const productListBlog = [
  {image: IMAGES.Product2, title:"Bacon Cheeseburger", price:'320'},
  {image: IMAGES.Product3, title:"Mushroom Swiss Burger", price:'430'},
  {image: IMAGES.Product4, title:"Jalapeno Burger", price:'140'},
  {image: IMAGES.Product5, title:"Hawaiian Burger", price:'220'},
  {image: IMAGES.Product6, title:"Hawaiian Luau Delight", price:'450'},
  {image: IMAGES.Product7, title:"Margherita Masterpiece", price:'160'},
];

const init = false;
const reducer = (state, action) =>{
	if(action.type==='reviewModal'){
		return { ...state, reviewModal: !state.reviewModal}
	}
	return state;
}

const ProductList = () => {
  const notify = (message, status) => {
    if (status == "error") {
        toast.error(message);

    }
    else {
        toast.success(message);

    }
}
  const [orderList, setOrderList] = useState([])
  const [activeKey, setActiveKey] = useState();

  const [
      getOrderListResponse,
      getOrderListError,
      getOrderListLoading,
      getOrderListFetch,
  ] = useAxios();
  const [
      changeMenuAvailResponse,
      changeMenuAvailError,
      changeMenuAvailLoading,
      changeMenuAvailFetch,
  ] = useAxios();
  const [
      changeInProductServicesResponse,
      changeInProductServicesError,
      changeInProductServicesLoading,
      changeInProductServicesFetch,
  ] = useAxios();
  const [selectedMenu, setSelectedMenu] = useState([])
  const [oldCat, setOldCat] = useState(false)
  const fetchCustomerData = () => {
      getOrderListFetch(getCategoriesData())
  }
  const changeMenuAvailablity = (action, id) => {
    setOldCat(activeKey)
    setActiveKey()

    changeMenuAvailFetch(changeMenuAvailablility({
      id:id,
      action:action
    }))
  }
  const changeInBuyoneGetOne = (id) => {
    setOldCat(activeKey)
    setActiveKey()
    changeInProductServicesFetch(changeBuyonegetone({
      id:id    }))
  }
  const changeinAddOn = (id) => {
    setOldCat(activeKey)
    setActiveKey()
    changeInProductServicesFetch(changeaddOn({
      id:id    }))
  }
  useEffect(() => {
      fetchCustomerData()
  }, [])
  useEffect(() => {
      if (getOrderListError?.response) {
          notify(getOrderListError?.response?.data, "error")
      }
  }, [getOrderListError])
  useEffect(() => {
      if (getOrderListResponse?.result == "success") {
          setOrderList(getOrderListResponse?.data)      
          if(oldCat){
            setActiveKey(oldCat)      
          }
          else{
            setActiveKey(getOrderListResponse?.data[0]?.name)      
          }
      }
  }, [getOrderListResponse])

  useEffect(() => {
      if (changeMenuAvailError?.response) {
          notify(changeMenuAvailError?.response?.data, "error")
      }
  }, [changeMenuAvailError])
  useEffect(() => {
      if (changeInProductServicesError?.response) {
          notify(changeInProductServicesError?.response?.data, "error")
      }
  }, [changeInProductServicesError])

  useEffect(() => {
      if (changeMenuAvailResponse?.result == "success") {
        notify(changeMenuAvailResponse?.message, "success")
        fetchCustomerData()
      }
  }, [changeMenuAvailResponse])
  useEffect(() => {
      if (changeInProductServicesResponse?.result == "success") {
        notify(changeInProductServicesResponse?.message, "success")
        fetchCustomerData()
      }
  }, [changeInProductServicesResponse])

  useEffect(()=>{
    if(activeKey){
      const selectedMenu = orderList.filter((item)=>{
        return item.name == activeKey
      })
      console.log(selectedMenu)
      setSelectedMenu(selectedMenu[0]?.items)
    }
  },[activeKey])
const handleSelect = (key) => {
  setActiveKey(key)

}
  const [state, dispatch] = useReducer(reducer ,init);	  
  
  return (
    <Fragment>   
    
      <div className="container mh-auto">
      <div className="d-flex justify-content-between mb-4 flex-wrap">
                    <Nav as="ul" className="revnue-tab nav nav-tabs"  activeKey={activeKey} // Control which tab is active
                          onSelect={handleSelect}>
                      {orderList.map((item)=>{
return(
  <Nav.Item as="li" >
  <Nav.Link  eventKey={item.name}>{item.name}</Nav.Link>
</Nav.Item>
)
                      })}
                       
                 
                    </Nav>
                    
                </div>
                
          <div className="row">

          
             {selectedMenu.map((item, index)=>(            
                <div className="col-lg-12 col-xl-6 col-xxl-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row m-b-30">
                        <div className="col-md-5 col-xxl-12">
                          <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                            <div className="new-arrivals-img-contnent">
                              <img className="img-fluid border-img" src={test_url_images + item.image} alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7 col-xxl-12">
                          <div className="new-arrival-content position-relative">
                            <h4>
                              <Link to={`/ecom-checkout/${item.id}`}>
                               {item.name}
                              </Link>
                            </h4>

                           
                            <p className="text-content">
                             {item.description}
                            </p>
                            
                          </div>
                          <div>
                          <p className="price">€ {item.price}</p>

                            </div>
                          <Nav
                          as="ul"
                          style={{width:"70%"}}
                          className="nav nav-tabs dzm-tabs"
                          id="myTab"
                          role="tablist"
                          activeKey={item?.is_available ? "available" : "not_available"} // Control which tab is active
                          onSelect={(key)=>changeMenuAvailablity(key, item?.id)} // Handle tab selection
                        >
                          <Nav.Item
                            as="li"
                            className="nav-item"
                            role="presentation"
                            eventKey="available"
                          >
                            <Nav.Link as="button" type="button" eventKey="available">
                               Item Avilable 
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" eventKey="not_available">
                            <Nav.Link
                              as="button"
                              type="button"
                              eventKey="not_available"
                            >
                              Item Not Avilable
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <div className="mt-4">
                         <input type="checkbox" name="buyonegetone" checked={item?.is_buy_one} onChange={()=>{changeInBuyoneGetOne(item?.id)}}/>
                         <label for="buyonegetone" className="mx-4"> Buy one get one</label>
                         </div>
                        <div>
                         <input type="checkbox" name="addon" checked={item?.side_on} onChange={()=>{changeinAddOn(item?.id)}}/>
                         <label for="addon" className="mx-4"> Add to add on list</label>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}            
            {/* review */}
            <Modal show={state.reviewModal} onHide={() => dispatch({type:'reviewModal'})} className="modal fade" id="reviewModal">
              <>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Review</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                      onClick={() => dispatch({type:'reviewModal'})}
                    >
                    </button>
                  </div>
                  <div className="modal-body">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();                        
                          dispatch({type:'reviewModal'})
                      }}
                    >
                      <div className="text-center mb-4">
                        <img
                          className="img-fluid rounded"
                          width={78}
                          src={IMAGES.Avatar}
                          alt="DexignZone"
                        />
                      </div>
                      <div className="form-group">
                        <div className="rating-widget mb-4 text-center">                          
                          <div className="rating-stars">
                            <ul
                              id="stars"
                              className="d-flex justify-content-center align-items-center"
                            >	
                              <li>
                                <i className="fa fa-star me-1" />
                              </li>{" "}
                              <li>
                                <i className="fa fa-star me-1" />
                              </li>{" "}
                              <li>
                                <i className="fa fa-star me-1" />
                              </li>{" "}
                              <li>
                                <i className="fa fa-star me-1" />
                              </li>{" "}
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Comment"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
                      <button className="btn btn-success btn-block">RATE</button>
                    </form>
                  </div>
                </div>
              </>
            </Modal>
            <ToastContainer/>
          </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
