import React from 'react'
import { Link } from 'react-router-dom'
import "../style/style.css";

const Header = () => {
    const username = localStorage.getItem('username');
    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary headercontainer">
            <div className="container-fluid">
                <Link className="navbar-brand logo" to="/home">Logo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav headerul">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" to="/emloyeelist">Employee List</Link>
                    </li>
                    {username && (
                        <li className="nav-item">
                        <a className="nav-link active">{username}</a>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link onClick={handleLogout} className="nav-link active" to="/">Logout</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    </div>
  )
}

export default Header