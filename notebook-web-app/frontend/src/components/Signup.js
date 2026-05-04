import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BASE_URL from './api';

function Signup(props) {

    const [info,setInfo] = useState({username:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();

    const change = (e)=>{
        setInfo({...info,[e.target.name]:e.target.value});
    }

    const onsubmit = async(e)=>{

        e.preventDefault();
        if(!info.email.endsWith("@gmail.com")){
            props.fun("warning","email should endwith @gmail.com");
            let close = document.getElementById("eyechange2");
            close.className = "bi bi-eye-slash";
        }
        else if(info.password!==info.cpassword)
        {
            props.fun("warning","Password and Confirm-password should be same");
            let close = document.getElementById("eyechange2");
            close.className = "bi bi-eye-slash";
        }
        else
        {
            const response = await fetch(`${BASE_URL}/signup`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(info)
            })

            const res = await response.json();
            if(res)
            {
                props.fun("warning","Email already Exits");
            }

            navigate("/login");
            setInfo({username:"",email:"",password:"",cpassword:""});
        }

    }

    const eye1 = ()=>{
        let pass = document.getElementById("password");
        if(pass.type==="password"){
            pass.type = "text";
            let open = document.getElementById("eyechange1");
            open.className = "bi bi-eye";
        }
        else{
            pass.type = "password";
            let close = document.getElementById("eyechange1");
            close.className = "bi bi-eye-slash";
        }
    }

    const eye2 = ()=>{
        let pass2 = document.getElementById("cpassword");
        if(pass2.type==="password"){
            pass2.type = "text";
            let open = document.getElementById("eyechange2");
            open.className = "bi bi-eye";
        }
        else{
            pass2.type = "password";
            let close = document.getElementById("eyechange2");
            close.className = "bi bi-eye-slash";
        }
    }

    return (
    <div className='container d-flex my-5' style={{justifyContent:"space-around"}}>
        <div id='leftpart' style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div style={{fontSize:"44px"}}>Notebook</div>
                <div style={{fontSize:"17px",maxWidth:"28vw"}}>Start organizing your ideas today and manage your thoughts effortlessly</div>
        </div>
        <div><form onSubmit={onsubmit} >
            <div style={{fontSize:"50px",marginBottom:"20px",color:"#1f2937"}}>Signup To Continue</div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" name='username' value={info.username} onChange={change} id="username" style={{width:"340px"}} aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" name='email' onChange={change} value={info.email} id="email" style={{width:"340px"}} aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div style={{position:"relative"}}>
                    <input type="password" className="form-control" name='password' value={info.password} onChange={change} style={{width:"340px"}} id="password" required/>
                    <i className="bi bi-eye-slash" id='eyechange1' style={{position:"absolute",right: "100px",top: "8px",padding: "0px 6px",cursor:"pointer"}} onClick={eye1}></i>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                
                <div style={{position:"relative"}}>
                    <input type="password" className="form-control" name='cpassword' onChange={change} value={info.cpassword} id="cpassword" style={{width:"340px"}} aria-describedby="emailHelp" required/>
                    <i className="bi bi-eye-slash" id='eyechange2' style={{position:"absolute",right: "100px",top: "8px",padding: "0px 6px",cursor:"pointer"}} onClick={eye2}></i>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form></div>
    </div>
    )
}

export default Signup
