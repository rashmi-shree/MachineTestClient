import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../style/style.css";

const Login = () => {
    const [loginData, setLoginData] = useState([]);
    const navigate = useNavigate()
    const changeEvent = (e) =>{
        const {name, value} = e.target;
        setLoginData(prevState =>({
            ...prevState,
            [name]:value
        }))
    }
    const submitEvent = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/admin/login", loginData);
            console.log(response, response.data, response.status);
            if (response.status === 200) {
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token)
                localStorage.setItem('username', response.data.username);
                navigate("/home");
            } else {
                console.log("Error:", response.data.message);
                window.alert(response.data.message); 
            }
        } catch (err) {
            if (err.response) {
                window.alert(err.response.data.message);
            } else {
                window.alert("Error occurred during login");
            }
        }
    }    
  return (
    <div className=''>
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary headercontainer">
                <div className="container-fluid loginbg">
                    <Link className="navbar-brand logo" to="/home">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
        <div className='loginsubH'>Login Page</div>
        <form className='loginformcontainer'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                <input name="username" onChange={changeEvent} type='text' className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input name="password" type='password' onChange={changeEvent} className="form-control" />
            </div>
            <button type="submit" onClick={submitEvent} className="btn btn-primary btnstyle">Submit</button>
        </form>
    </div>
  )
}

export default Login