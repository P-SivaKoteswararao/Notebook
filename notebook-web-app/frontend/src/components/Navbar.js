
import {Link, useNavigate} from 'react-router-dom';

function Navbar(props) {

    const navigate = useNavigate();

    const change = (e)=>{

        e.preventDefault();
        sessionStorage.removeItem("token");
        props.fun("success","Logout successfully");
        navigate("/login");
    }
    
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
            <div className="container-fluid">
                <h2 className="navbar-brand" style={{paddingBottom:"0px"}}>NoteBook</h2>
                {/* <h2 className='navbar-brand'>UserNotes</h2> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    
                    </ul>

                    {sessionStorage.getItem("token")===null?
                    (<div className="d-flex" style={{gap:"16px"}}>
                        <button className="btn btn-primary" type='button'><Link className="nav-link active" aria-current="page" to="/login">Login</Link></button>
                        <button className="btn btn-primary" type='button'><Link className="nav-link active" aria-current="page" to="/signup">Signup</Link></button>
                    </div>):
                    (<div>
                        <button className="btn btn-primary" type='button' onClick={change}>LogOut</button>
                    </div>)}
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
