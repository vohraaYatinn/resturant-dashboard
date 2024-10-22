import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import {  Route, Routes, useLocation , useNavigate , useParams } from 'react-router-dom';
/// Style
import "./other/swiper/swiper-bundle.min.css";

import "./css/style.css";
import Home from './jsx/components/Dashboard/Home';


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});
const isAuthenticated = () => {
  let storedToken = localStorage.getItem('userDetails');
  if (storedToken) return true;
  return false;
}
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



function App (props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
   

    
    let routeblog = (         
      <Routes>   
        <Route  path='*' element={<Login />} />
        <Route  path='/login' element={<Login />} />
        <Route path='/page-register' element={<SignUp />} />    
      </Routes> 
    );
    if (isAuthenticated()) {
		  return (
			  <>
            <Suspense fallback={              
                <div id="preloader">                
                    <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1"></div>
                        <div className="sk-child sk-bounce2"></div>
                        <div className="sk-child sk-bounce3"></div>
                    </div>
                </div>  
              }
            >
              <Index /> 
            </Suspense>
        </>
      );    
	}else{
		return (
			  <div className="vh-100">
            <Suspense fallback={
                <div id="preloader">
                    <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1"></div>
                        <div className="sk-child sk-bounce2"></div>
                        <div className="sk-child sk-bounce3"></div>
                    </div>
                </div>
              }
            >
                {routeblog}
                
            </Suspense>
			  </div>
		);
	}
};



export default withRouter(App); 

