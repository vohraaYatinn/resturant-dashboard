import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { loadingToggleAction,loginAction, loginConfirmedAction,
} from '../../store/actions/AuthActions';

// import rainbow from '../../images/rainbow.gif';
import login from '../../images/login.jpg';
import useAxios from "../../network/useAxios";
import { loginFunction } from '../../urls/urls';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

function Login (props) {
	const notify = (message, term) =>{
		if(term == "success"){
			dispatch(loginConfirmedAction());

			toast.success(message)
		}
		else{
			toast.error(message)

		}
	} ;
	const navigate = useNavigate();

	const [
		loginResponse,
		loginError,
		loginLoading,
		loginFetch,
	  ] = useAxios();
	
	  useEffect(()=>{
		if(loginError){
			notify(loginError?.response?.data, "error")
		}
	  },[loginError])
	  useEffect(()=>{
		if(loginResponse?.result == "success"){
			notify("login Success", "success")
			localStorage.setItem('userDetails', loginResponse?.token);
			setTimeout(() => {
				navigate('/dashboard');
			}, 2000);
		}
	  },[loginResponse])
	// const [heartActive, setHeartActive] = useState(true);	
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

	const handleLoginFunction = () => {
		loginFetch(loginFunction({
			username:email,
			password:password
		}))
	  }

      function onLogin(e) {	

    }
  	return (        
		<div className="page-wraper">
			<div className="authincation ">
				<div className="container ">
					<div className="row justify-content-center h-100 align-items-center">
						<div className="col-md-12 h-100 d-flex align-items-center">
							<div className="authincation-content style-1">
								<div className="row h-100">
									<div className="col-md-6 h-100">
										<div className="img-bx">
											<img src={login} alt="" className="img-fluid" />
										</div>
									</div>
									<div className="col-md-6">
										<div className="auth-form">
											<h4 className="main-title">Sign in</h4>
											{props.errorMessage && (
												<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
													{props.errorMessage}
												</div>
											)}
											
										
												<div className="form-group mb-3 pb-3">
													<label className="font-w600">Username</label>
													<input type="text" placeholder='Enter your Username' className="form-control solid" value={email} onChange={(e) => setEmail(e.target.value)} />
													{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
												</div>
												<div className="form-group mb-3 pb-3">
													<label className="font-w600">Password</label>													
													<input type="password" placeholder='Enter Password' className="form-control solid" value={password} onChange={(e) => setPassword(e.target.value)} />	
													{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
												</div>
												<div className="text-center">
													
													<button type="submit" className="btn btn-primary btn-block rounded" onClick={handleLoginFunction}>{loginLoading?    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
:" Sign Me In"}</button>
												</div>
											
											<div className="new-account mt-3">
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer          
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
		</div>            
		
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);