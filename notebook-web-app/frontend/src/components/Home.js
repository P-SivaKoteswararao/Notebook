import React, { useEffect, useState } from 'react'
import Notes from './Notes'
import Note from './Note'
import { useNavigate } from 'react-router-dom';
import BASE_URL from './api';

function Home(props) {

  const [data,setData] = useState([]);
  const navigate = useNavigate();

  const fetchdata = async(token)=>{

    const response = await fetch(`${BASE_URL}/notes`,{
      method:"GET",
      headers:{
        "Authorization": "Bearer "+token
      }
    });

    if(response.status===401)
    {
      sessionStorage.removeItem("token");
      navigate("/login");
    }
    else
    {
      const notes = await response.json();
      setData(notes);
    }
  }


  useEffect(()=>{

    const token = sessionStorage.getItem("token");
    if(!token)
    {
      props.fun("warning","Login to continue Notebook");
      navigate("/login");
    }
    else{
      fetchdata(token);
    }
    // eslint-disable-next-line
  },[])

  const fun = (name)=>{
    if(name!==null){
      return name.charAt(0).toUpperCase()+name.substring(1);
    }
  }

  return (
    <div>
        <Notes fetchdata={fetchdata} />

        <div className="container">
          <h1>{fun(sessionStorage.getItem("username"))} Notes :-</h1>
          {data.length===0?<div style={{fontSize:"20px"}}>No Notes Found</div>:
          <div className='row'>
              {data.length!==0 && data.map((note)=>{ 
                  return (
                  <div className='col-md-4' key={note.id}>
                      <Note note={note} fetchdata={fetchdata}/>
                  </div>
                )
              })}
          </div>}
        </div>
    </div>

    
  )
}

export default Home
