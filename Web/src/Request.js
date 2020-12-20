import React, { useState, useEffect } from "react";
//import React, { useState } from 'react';
import {db} from "./Firebase";
import { NavLink } from "react-router-dom";

const Request = ()=> {

  const [Name, setName] = useState("");
  // const [Email, setEmail] = useState("");
  // const [Phone, setPhone] = useState("");
  const [sName, setsName] = useState("");
  const [sContact, setsContact] = useState("");
  const [sAddress, setsAddress] = useState("");
  const [loader, setLoader] = useState(false);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
  
  db.collection("requests")
  .add({
    Name: Name,
    sName: sName,
    sContact: sContact,
    sAddress: sAddress
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
  setsContact("");
  setsAddress("");
  setsName("");
  
  };
    return (
      <>
<div className = "container-fluid">
<div className= "col-7 mx-auto"> 
<h1 className = "brand-name" id = "reqh1"> Please Enter The Required Information </h1>
</div>
    <div className= "row">
        <div className= "col-4 mx-auto"> 
    <form className="form" onSubmit= {handleSubmit}>
     

      <label> Name: </label>
      <input placeholder="Your Name" value = {Name} onChange ={(e) => setName(e.target.value)} required></input>

      <label> School Name </label>
      <input placeholder="School Name" value = {sName} onChange ={(e) => setsName(e.target.value)} required></input>

      <label> School Contact </label>
      <input placeholder="Contact Number" value = {sContact} onChange ={(e) => setsContact(e.target.value)} required></input>

      <label> School Address </label>
      <textarea placeholder="Address" height = '300px' value = {sAddress} onChange ={(e) => setsAddress(e.target.value)} required></textarea>

       <button type= "submit" className = "btn-get-started" style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}> Submit </button>

    </form>

    </div>
    </div>
    </div>
<section>
    <footer className="page-footer font-small blue" id = "footer">


<div className="footer-copyright text-center py-3">© 2020 Copyright:
  <NavLink to="/Home"> VanTrackingSystem.com</NavLink>
</div>


</footer>
</section>
      </>
  )
};

export default Request;