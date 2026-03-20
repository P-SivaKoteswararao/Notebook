import React, {useState } from 'react'
import { Modal } from 'bootstrap';
import {useNavigate } from 'react-router-dom';

function Allnotes(props) {

  const navigate = useNavigate();

  const deleteNote = async()=>{

    const token = sessionStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/deleteNote/${props.note.id}`,{
      method:"DELETE",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+token
      }
    })

    if(response.status===401){
      sessionStorage.removeItem("token");
      navigate("/login");
    }
    else
    {
      props.fetchdata(token);
    }
  }

  const updateNote = async(note) =>{
    
    const token = sessionStorage.getItem("token");
    const response = await fetch('http://localhost:8080/updateNote',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+token
      },
      body: JSON.stringify(note)
    })

    if(response.status===401){
      sessionStorage.removeItem("token");
      navigate('/login');
    }

    if(response.ok){
      props.fetchdata(token);
    }
    else{
      console.log('Not updated');
    }
  }

  const openForm = ()=>{

    const element = document.getElementById("exampleModal");
    const modal = new Modal(element);
    modal.show();
  }

  const [data,setData] = useState({id:props.note.id,title:props.note.title,description:props.note.description,tag:props.note.tag});

  const change = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const cancel = ()=>{
    setData(props.note);
  }
    
  const onsubmit = (f)=>{

    f.preventDefault();
    updateNote(data);
    document.getElementById("closing").click();
    //console.log('submit');
  }

  return (
    <div style={{marginBottom:"30px"}}>
        <div className="card" style={{maxWidth:"320px"}}>
            <div className="card-body">
                <div className='d-flex justify-content-between'>
                  <div style={{overflow:"auto"}}><h5 className="card-title">{props.note.title}</h5></div>
                  <div style={{display:"flex",gap:"10px"}}>
                    <span className='trash'><i className="bi bi-trash" onClick={deleteNote} style={{cursor:"pointer"}}></i></span>
                    <span className='pencil'><i className="bi bi-pencil" onClick={openForm} style={{cursor:"pointer"}}></i></span>
                  </div>
                </div>
                <p className="card-text" style={{overflow:"auto"}}>{props.note.description}</p>
                <p className="card-text" style={{overflow:"auto"}}>{props.note.tag}</p>
            </div>
        </div>




        {/* Modal button */}
        <button type="button" className="btn btn-primary" hidden data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                <button type="button" className="btn-close" onClick={cancel} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onsubmit}>
                  <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" name="title" onChange={change} value={data.title} className="form-control" id="title" aria-describedby="emailHelp" style={{width:"300px"}} minLength={1} required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" name="description" onChange={change} value={data.description} className="form-control" id="description" style={{width:"300px"}} minLength={1} required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" name='tag' onChange={change} value={data.tag} className="form-control" id="tag" style={{width:"300px"}} minLength={1} required/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cancel} data-bs-dismiss="modal" id="closing">Close</button>
                    <button type="submit" className="btn btn-primary" >Update</button>
                </div>
                </form>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancel} data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" onClick={onsubmit} data-bs-dismiss="modal">Update</button>
              </div> */}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Allnotes
