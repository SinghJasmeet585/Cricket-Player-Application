import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

export default function Register() {
	const history = useHistory();
	const [name, setName] = useState('');
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loggedUser, setLoggedUser] = useState('');



	useEffect(() => {
		setLoggedUser(localStorage.getItem('username'));
	}, [loggedUser]);

	const registerSubmit = e => {
		e.preventDefault();
		const user = { name, username, password, imageUrl };
		// console.log(user)

		axios.post('http://localhost:5000/users/add', user)
			.then((res) => {
	
				history.push("/login");
				alert('Registration Done!!! Login');
			})
			.catch(err => {
				// console.log(err);
				alert('User Already Exists');
			})

		
	}

	if (loggedUser !== null) {
		return (
			<div>
				<h3>You have already logged in - No need for you to register</h3>
				<Link to="/dashboard">Click here to go to the dashboard</Link>
			</div>
		)
	}


	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6 login-section-wrapper">
						<div className="brand-wrapper">
							<img src="assets/images/ibm.svg" className="logo" alt="ibm-logo" />
						</div>
						<div className="login-wrapper my-auto">
							<h1 className="login-title">Register</h1>
							<form >
								<div className="form-group">
									<label htmlFor="nameInput">Name</label>
									<input type="text" id="nameInput" placeholder="Enter your Name" name="name" className="form-control"
										onChange={(e) => { setName(e.target.value) }} />
								</div>
								<div className="form-group">
									<label htmlFor="emailInput">Email</label>
									<input type="text" id="emailInput" placeholder="example@example.com" name="username" className="form-control"
										onChange={(e) => { setUserName(e.target.value) }} />
								</div>
								<div className="form-group">
									<label htmlFor="passwordInput">Password</label>
									<input type="password" id="passwordInput"
										name="password"
										placeholder="Enter your Password"
										className="form-control"
										onChange={(e) => { setPassword(e.target.value) }} />
								</div>
								<div className="form-group">
									<label htmlFor="imageUrlInput">Image Url</label>
									<input type="text" id="imageUrlInput"
										name="imageUrl"
										placeholder="Your Image Url"
										className="form-control"
										onChange={(e) => { setImageUrl(e.target.value) }} />
								</div>
								<input type="submit" className="btn btn-block login-btn"
									value="Register" onClick={registerSubmit} />
							</form>
							<p className="login-wrapper-footer-text">Already have an account </p>
							<a href="/login">Login here.</a>
						</div>
					</div>
					<div className="col-sm-6 px-0 d-none d-md-block">
						<img src="assets/images/man-cricket.jpeg" alt="man-cricket-side" className="login-img-register" />
					</div>
				</div>
			</div>
		</div>
	)

}
