
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Alert from './components/Alert';
import {useState } from 'react';


function App() {

  const [alert,setAlert] = useState({type:"",message:""});

  const fun = (type,message)=>{

    setAlert({type:type,message:message});
    setTimeout(()=>{
      setAlert({type:"",message:""});
    },4000)
  }

  return (
    <Router>
      <div>
        <Navbar fun={fun}/>
        <Alert alert={alert}/>
        <Routes>
          <Route path='/' exact element={<Home fun={fun}/>}/>
          <Route path='/login' exact element={<Login fun={fun}/>}/>
          <Route path='/signup' exact element={<Signup fun={fun}/>}/>
        </Routes>
      </div>

    </Router>
  )
}

export default App;
