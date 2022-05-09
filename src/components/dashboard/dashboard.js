import React from "react";
import { Link } from "react-router-dom";
import deleteContactImg from "../assets/delete-black-18dp.svg";
import editContactImg from "../assets/create-black-18dp.svg";
import HeaderComponent from "../header-component/HeaderComponent";
import "./dashboard.css";

const Dashboard = (props) => {

    console.log(props);

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        const {id, fullName, address, city, state, zip, phone} = contact;
        return (
          <tr>
            <td>{fullName}</td>
            <td>{address}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{zip}</td>
            <td>{phone}</td>
            <td>
            <Link to={{ pathname: `/edit`, state: { contact: contact } }}>
                <img src={editContactImg} alt="edit"/>
            </Link>
                <img src={deleteContactImg} alt="delete" onClick={() => deleteContactHandler(id)}/>
            </td>
        </tr>
        );
    });

    return (
        <div>
            <HeaderComponent/>
            <div className="main-content">
                <div className="header-content person-header">
                    <div className="person-detail-text">
                        Person Details
                        <div className="person-count"></div>
                    </div>
                    <Link to="/add" className="add-button">
                        <img src="..\assets\add1.svg" alt=""/>+ Add Person
                    </Link>
                </div>
                <div className="main-content">
                    <div className="table-main">
                        <table id="table-display" className="table">
                                <tr>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                                {renderContactList}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;