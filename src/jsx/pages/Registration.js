import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
// image
import logo from '../../images/logo/logo-full.png';

function Register(props) {
	// const [heartActive, setHeartActive] = useState(true);

    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
	const navigate = useNavigate();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(email, password, navigate));
    }
	
	return (
		<>		
			<div className="authincation h-100">
				<div className="container h-100">
					<div className="row justify-content-center h-100 align-items-center">
						<div className="col-md-6">
							<div className="authincation-content">
								<div className="row no-gutters">
									<div className="col-xl-12">
										<div className="auth-form">
											<div className="text-center mb-3">
												<Link to="#"><img src={logo} alt="" /></Link>
											</div>
											<h4 className="text-center mb-4">Sign up your account</h4>
											{props.errorMessage && (
												<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
													{props.errorMessage}
												</div>
											)}
											{props.successMessage && (
												<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
													{props.successMessage}
												</div>
											)}
											<form onSubmit={onSignUp}>
												<div className="mb-3">
													<label className="form-label"><strong>Username</strong></label>
													<input type="text" className="form-control" placeholder="username" />
												</div>
												<div className="mb-3">
													<label className="form-label"><strong>Email</strong></label>													
													<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="hello@example.com"/>
													{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
												</div>
												<div className="mb-3">
													<label className="form-label"><strong>Password</strong></label>
													<input
													value={password}
													onChange={(e) =>
														setPassword(e.target.value)
													}
													className="form-control"
													placeholder="passowrd"
												/>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
												</div>
												<div className="text-center mt-4">
													<button type="submit" className="btn btn-primary btn-block">Sign me up</button>
												</div>
											</form>
											<div className="new-account mt-3">
												<p>Already have an account? <Link to={"/login"} className="text-primary" >Sign in</Link></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>			
		</>
	);
};



export default connect(Register);

