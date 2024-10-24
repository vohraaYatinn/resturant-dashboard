import React  from 'react';
import {connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Logout } from '../../../store/actions/AuthActions';
import { SVGICON } from '../../constant/theme';


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function LogoutPage(props){
  const dispatch = useDispatch();
	const navigate = useNavigate();
    function onLogout() {
      localStorage.removeItem("userDetails")
      navigate("/login")
      //  dispatch(Logout(navigate));
    }
    return(
        <>
            <button className="dropdown-item ai-icon ms-1 logout-btn" onClick={onLogout}>
              {SVGICON.Logout} {" "}
							  <span className="ms-2">Logout </span>              
            </button>
        </>
    )
} 


export default withRouter(LogoutPage);