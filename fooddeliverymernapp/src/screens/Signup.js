import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", geolocation: ""});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation}),
        });
        const resjson = await response.json();
        console.log(resjson);

        if (!resjson.success) {
            alert("Enter Valid Credentials!");
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} id="name" onChange={onValueChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onValueChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={onValueChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} id="address" onChange={onValueChange} />
                </div>
                <button type="submit" className="btn btn-success">SignUp</button>
                <Link to="/login" className="m-3 btn btn-warning">Already a user</Link>
            </form>
        </div>
    </>
  )
}
