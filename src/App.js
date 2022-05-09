import './App.css';
import ContactForm from './components/contact-form/contact-form'
import Dashboard from './components/dashboard/dashboard';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import api from "./api/contacts";
import EditContactForm from './components/edit-contact-form/edit-contact-form';

function App() {
  const LOCAL_STORAGE_KEY = "contact";
  const [contacts, setContacts] = useState(
    [
    ]
  );

  const retrieveContacts = async () => {
    const response = await api.get("/contact");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      ...contact,
    };

    const response = await api.post("/contact", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contact/${contact.id}`, contact);
    console.log(response.data);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contact/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
  }, [contacts]);

  return (
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" render={(props) => (
              <Dashboard
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
                          />
                        )}
              ></Route>
              <Route exact path="/add" render={(props) => (
              <ContactForm {...props} addContactHandler={addContactHandler} />
                )}/>
                <Route exact path="/edit" render={(props) => (
              <EditContactForm {...props} updateContactHandler={updateContactHandler} />
                )}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;