import React, { useState } from 'react';
import "./contact-form.css";
import cancelButton from "../assets/cancel.jpeg";
import HeaderComponent from "../header-component/HeaderComponent";
import { Link } from "react-router-dom";

const ContactForm = (props) => {
    
    console.log(props);
    const cities = ["Ahmedabad","Bangalore","Chennai","Delhi","Hyderabad","Jaipur","Kolkata","Lucknow","Mumbai","Pune","Surat"];
    const states = ["Andhra Pradesh","Andaman and Nicobar Islands","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadar and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh"];
    
    const save = async (event) => {
        event.preventDefault();
        // console.log(formValue);
        /*if (await validData()) {
            console.log('error', formValue);
            return;
        }*/
        
        setForm({...formValue, error:{}});
        if (props.location.pathname === '/edit') {
            props.updateContactHandler(formValue);
        } else {
            props.addContactHandler(formValue);
        }
        props.history.push("/");
    }

    let initalValue = {
        fullName : '',
        id: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        isUpdate: false,
        error: {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: ''      
        }
    }

    const [formValue, setForm] = useState(props.location.pathname === '/edit' ? props.location.state.contact : initalValue);
    
    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue];
        if (index > -1) {
            checkArray.splice(index, 1)
        } else {
            checkArray.push(name);
        }
        setForm({ ...formValue, departmentValue: checkArray});
    }
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }
    const validData =  async () => {
        let isError = false;
        let error = {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: ''  
        };
        if (formValue.fullName.length < 1) {
            error.name = 'name is required field'
            isError = true
        }

        let nameRegex = RegExp('[A-Z]{1}[a-z]{2,}');
        if (nameRegex.test(formValue.fullName)) {
            error.fullName = '';
        } else {
            error.fullName = 'name is not valid';
            isError = true;
        }
        if (formValue.address.length < 1) {
            error.address = 'address is required field'
            isError = true
        }
        if (formValue.city.length < 1) {
            error.city = 'city is required field'
            isError = true
        }
        if (formValue.state.length < 1) {
            error.state = 'state is required field'
            isError = true
        }
        if (formValue.zip.length < 1) {
            error.zip = 'zip is required field'
            isError = true
        }
        if (formValue.phone.length < 1) {
            error.phone = 'phone is required field'
            isError = true
        }
        await setForm( {...formValue, error:error});
        return isError;
    }
    const cancel = () => {
        props.history.push("/");
    }

    const reset = () => {
        setForm({ ...formValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    return (
        <div>
            <HeaderComponent/>
        <div className="form-content">
            <form action="#" className="form" onSubmit={save}>
                <div className="form-head">
                    <div className="form-head-text">Person Address Form</div>
                    <Link to="/"><img className="form-head-image" src={cancelButton}
                    alt="CancelButton" /></Link>
                </div>
            
                <div className="form-constrains">
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Full Name</label>
                        <br/>
                        <input key={1} type="text" className="input" id="fullName" pattern='^[A-Z]{1}[a-z]{2,}$' onChange={changeValue} name="fullName" placeholder="Your name.." autoComplete="off" required />
                        <span>Name is invalid</span>
                    </div>
                    <div className="row-content">
                        <label htmlFor="phoneNumber" className="label text">Phone Number</label>
                        <br/>
                        <input type="tel" className="input" id="phone" pattern='^[0-9]{10}$' onChange={changeValue} name="phone" placeholder="Your phone number.."
                        autoComplete="off" required/>
                        <span>Phone number is invalid</span>
                    </div>

                    <div className="row-content">
                        <label htmlFor="address" className="label text">Address</label>
                        <br/>
                        <textarea name="address" id="address" pattern='^[A-Z]{1}[a-z]{2,}$' placeholder="Your address" onChange={changeValue} autoComplete="off" required></textarea>
                        <span>Address is invalid</span>
                    </div>
                    <div className="row-content">
                        <div className="column-constrains">
                            <div className="column-content">
                                <label htmlFor="city" className="label text">City</label>
                                <br/>
                                <select name="city" id="city" onChange={changeValue} required>
                                    <option hidden defaultValue="Select City">Select City</option>
                                    { 
                                        cities.map(city => {
                                            return (<option value={city}>{city}</option>);
                                        })
                                    }
                                </select>
                            </div>

                            <div className="column-content">
                                <label htmlFor="state" className="label text">State</label>
                                <br/>
                                <select name="state" id="state" onChange={changeValue}>
                                    <option hidden defaultValue="Select State">Select State</option>
                                    { 
                                        states.map(state => {
                                            return (<option value={state}>{state}</option>);
                                        })
                                    }
                                </select>
                            </div>

                            <div className="column-content">
                                <label htmlFor="zip" className="label text">Zip code</label>
                                <br/>
                                <input type="text" className="input zipcode" id="zip" pattern='^[0-9]{6}$' onChange={changeValue} name="zip" autoComplete="off" placeholder="Your zipcode.." required />
                                <span>Zip is invalid</span>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-contact">
                        <button type="submit" className="button button-submit" id="submitButton">Add</button>
                        <button type="reset" className="button button-reset" id="resetButton" onClick={() => reset()}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ContactForm;