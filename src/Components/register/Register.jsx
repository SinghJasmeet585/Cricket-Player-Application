import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Register() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const registerSubmit = e => {
        e.preventDefault();
        const user = {name,username, password };
        console.log(user)

        axios.post('http://localhost:5000/users/add',user)
            .then((res) => {
                console.log("Hello")
                console.log("res")
                history.push("/login");
                alert('Registration Done!!! Login');
            })
            .catch(err=>{
            console.log(err)
            })

        // axios.post('http://localhost:5000/users/add', user)
        //     .then(res => console.log(res.data));

        // axios.get('http://localhost:5000/dashPlayers/')
        //     .then((res) => {
        //         console.log("Hell")
        //         console.log(res.data)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })


        console.log("Register clicked")
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
                                <input type="submit" className="btn btn-block login-btn"
                                    value="Register" onClick={registerSubmit} />
                            </form>
                            <p className="login-wrapper-footer-text">Already have an account </p>
                            <a href="/login">Login here.</a>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="assets/images/man-cricket.jpeg" alt="man-cricket-side" className="login-img" />
                    </div>
                </div>
            </div>
        </div>
    )

}
