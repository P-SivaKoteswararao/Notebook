import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BASE_URL from './api';

function Login(props) {

    const [info,setInfo] = useState({email:"",password:""});
    const navigate = useNavigate();

    const change = (e)=>{
        setInfo({...info,[e.target.name]:e.target.value});
    }

    const onsubmit = async(e)=>{

        e.preventDefault();

        const response = await fetch(`${BASE_URL}/login`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(info)
        })

        if(response.ok)
        {
            const res = await response.json();
            console.log(res);
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",res.username);
            navigate("/");
            props.fun("success","Logged in successfully");
        }
        else
        {
            props.fun("warning","Incorrect details.");
            let close = document.getElementById("eyechange");
            close.className = "bi bi-eye-slash";
        }
        setInfo({email:"",password:""});

    }

    const eye = ()=>{
        let pass = document.getElementById("password");
        if(pass.type==="password"){
            pass.type = "text";
            let open = document.getElementById("eyechange");
            open.className = "bi bi-eye";
        }
        else{
            pass.type = "password";
            let close = document.getElementById("eyechange");
            close.className = "bi bi-eye-slash";
        }
    }
    
    return (
    <div className='colors'>
        <div className='container d-flex my-5' style={{justifyContent:"space-around"}}>
            <div id='leftpart' style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{fontSize:"44px"}}>Welcome to Notebook</div>
                <div style={{fontSize:"17px",maxWidth:"28vw"}}>Capture your ideas and keep them organized on Notebook</div>
            </div>
            <div><form onSubmit={onsubmit}>
                <div style={{fontSize:"50px",marginBottom:"20px",color:"#1f2937"}}>Login To Continue</div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' placeholder='Enter email' value={info.email} onChange={change} style={{width:"350px"}} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div style={{position:"relative"}}>
                        <input type="password"  className="form-control" name='password' placeholder='Enter passsword' value={info.password} style={{width:"350px"}} onChange={change} id="password" required/>
                        <i className="bi bi-eye-slash" id="eyechange" style={{position:"absolute",right: "65px",top: "8px",padding: "0px 6px",cursor:"pointer"}} onClick={eye}></i>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary siva">Login</button>
                <div style={{marginTop:"10px",fontSize:"larger"}}>Don't have an account? <Link to="/signup">sign up</Link></div>
            </form></div>
        </div>
    </div>
    )
}

export default Login
