import React, { useState } from 'react'
import BASE_URL from './api';

function Notes(props) {

    const [data,setData] = useState({title:"",description:"",tag:""});

    const onchange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    

    const onsubmit = async(e)=>{
        
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        // console.log(token);
        await fetch(`${BASE_URL}/addNote`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization": "Bearer "+token
                },
                body:JSON.stringify(data)
            })
            
        props.fetchdata(token);   // --------> To fetch the data again by API
        setData({title:"",description:"",tag:""});
    }


    return (
        <div className='container d-flex justify-content-center my-5'>
            <form onSubmit={onsubmit}>
                <div style={{fontSize:"50px",marginBottom:"10px",color:"#1f2937",fontFamily:"ui-monospace"}}>Add a Note</div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onchange} name="title" value={data.title} className="form-control" id="title" aria-describedby="emailHelp" style={{width:"324px"}} minLength={1} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onchange} name="description" value={data.description} className="form-control" id="description" style={{width:"324px"}} minLength={1} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onchange} name='tag' value={data.tag} className="form-control" id="tag" style={{width:"324px"}} minLength={1} required/>
                </div>
                <button type="submit" className="btn btn-primary">Save Note</button>
            </form>
        </div>
    )
}

export default Notes
