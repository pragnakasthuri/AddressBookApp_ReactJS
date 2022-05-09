import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg"
import "./header-component.css";

const HeaderComponent = () => {
    return (
        <header className='header row center'>
            <div className="logo-content">
                <Link to="/">
                <img src={logo} alt="logo" /></Link>
                <div>
                    <span className="addressBook-text">Address</span><br />
                    <span className="addressBook-text addressBook-book">Book</span>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;