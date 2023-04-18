import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const resjson = await response.json();
        console.log(resjson);

        if (!resjson.success) {
            alert("Enter Valid Credentials!");
        }
        else {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", resjson.authToken);
            navigate("/");
        }
    };

    const onValueChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };
    
  return (
    <>
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onValueChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={onValueChange} />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <Link to="/signup" className="m-3 btn btn-warning">I'm a new user</Link>
            </form>
        </div>
    </>
  )
}
