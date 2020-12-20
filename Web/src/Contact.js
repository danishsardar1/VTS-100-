import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {db} from "./Firebase";
const Contact = ()=> {

const [cName, setName] = useState("");
const [cEmail, setEmail] = useState("");
const [cPhone, setPhone] = useState("");
const [cMessage, setMessage] = useState("");
const [loader, setLoader] = useState(false);


const handleSubmit = (e) => {
  e.preventDefault();
  setLoader(true);

db.collection("contacts")
.add({
  cName: cName,
  cEmail: cEmail,
  cPhone : cPhone,
  cMessage: cMessage,
})
.then(() => {
  setLoader(false);
  alert("Message has been submitted");
})

.catch((error) => {
        alert(error.message);
        setLoader(false);
});

setName("");
setEmail("");
setPhone("");
setMessage("");

};

    return (
      <>

<div className = "container-fluid">
    <div className= "row">
        <div className= "col-4 mx-auto"> 




    <form className="form" onSubmit= {handleSubmit}>
      <h1 className = "brand-name"> Contact Us </h1>

      <label> Name: </label>
      <input placeholder="Name" value = {cName} onChange ={(e) => setName(e.target.value)} required></input>

      <label> Email: </label>
      <input placeholder="Email" value = {cEmail} onChange ={(e) => setEmail(e.target.value)} required></input>

      <label> Phone Number: </label>
      <input placeholder="Phone Number" value = {cPhone} onChange ={(e) => setPhone(e.target.value)} required></input>

      <label> Message </label>
      <textarea  placeholder="Message" value = {cMessage} onChange ={(e) => setMessage(e.target.value)} required></textarea>

       <button type= "submit" className = "btn-get-started" style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}> Submit </button>

    </form>

    </div>
    </div>
    </div>

 
<footer className="page-footer font-small blue" id = "footer">


  <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <NavLink to="/Home"> VanTrackingSystem.com</NavLink>
  </div>


</footer>


  
      </>
  )
};

export default Contact;