import React from "react";
import { NavLink } from "react-router-dom";
import track from "../src/Images/track.jpg";
import web from "../src/Images/main.png";
import parent from "../src/Images/parent.png";
import driver from "../src/Images/driver.jpg";
import contact from "../src/Images/contact.jpg";

const Services = ()=> {
    return (
      <>

<section id = "header" className ="d-flex align-items-center">

<div className = "container-fluid nav_bg">
    <div className= "row">
        <div className= "col-10 mx-auto"> 
        <div className= "row">
            <div className ="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
            <h2 id = "serviceID"><strong>With <strong className = "brand-name">Van Tracking System </strong> You can have the following advanatges: </strong></h2>
                
                <hr/>
                <br/>
                <ul>
                    <li> Provides real-time tracking  </li>

                    <li> Private van drivers can get hired online </li>

                    <li> Parents can easily find available drivers linked to particular schools </li>

                    <li>The Parents can locate and track the driver from anywhere </li>

                    <li> Communicate with the driver anytime </li>

                    <li> If the parent has any complaints or suggestions, the parent can send a feedback</li>

                    <li> If the school or institution is not listed, they can easily request for it </li>

                    
                </ul>
              {/* <h1>Keep an eye on Drivers with <strong className = "brand-name">Van Tracking System </strong></h1>
              <h2 className="my-3"> Hire Drivers online</h2>
              <div className = "mt-3">
                <a href = "" className = "btn-get-started"> Get Started</a>
              </div> */}
            </div>

            <div className= "col-lg-6 order-1 order-lg-2 header-img">
              <img src = {web} className="img-fluid animated" alt = "home img"/>
            </div>

                {/* <div className = "col-md-4 col-10 mx-auto">
                    <div className="card" style="width: 18rem;">
                        <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div> */}
            </div>
      </div>
      </div>
    </div>
  


</section>


   <div className = "my-2">
      
   </div>
   <div className = "container-fluid mb-5"> 
      <div className = "row mt-4">
          <div className = "col-9 mx-auto">
              <div className = "row mt-5"> 
                 <div className = "col-md-6 col-10 mx-auto">

                 <div className="card">
                        <img  src={driver}  class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h4 class="card-title"> <strong>Driver App</strong></h4>
                            <p class="card-text">This app is specifically for drivers. The can select schools of their choices and get associated with them.
                            Theparents will contact and hire them online.</p>
                            {/* <NavLink to="#" class="btn btn-primary">Go somewhere</NavLink> */}
                        </div>
                        </div>

                 </div> 

                 <hr/>







                 <div className = "col-md-6 col-10 mx-auto">

                 <div className="card">
                        <img height = "300px" src={parent}  class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h4 class="card-title"><strong>Parent App</strong></h4>
                            <p class="card-text">Using this app, the parents can create multiple profiles for children and hire drivers online and track them. Parents can also coomunicate with drivers using the application.</p>
                            {/* <NavLink to="#" class="btn btn-primary">Go somewhere</NavLink> */}
                        </div>
                        </div>

                 </div>

                 <hr/>





                 <div className = "col-md-6 col-10 mx-auto">

                 <div className="card">
                        <img height = "300px" src={track} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title"><strong>Request a School</strong></h5>
                            <p class="card-text">If You can not find the school in the list. You can request send us a request to add that school.</p>
                            <NavLink to="./Request" class="btn btn-primary">Request</NavLink>
                        </div>
                        </div>

                 </div>

 
                 <div className = "col-md-6 col-10 mx-auto">

                 <div className="card">
                        <img height = "300px" src={contact} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title"><strong>Contact us</strong></h5>
                            <p class="card-text">Want to give a suggestion or report something? We are just one click away!!!</p>
                            <NavLink to="./Contact" class="btn btn-primary">Contact us</NavLink>
                        </div>
                        </div>

                 </div>



              </div>
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

export default Services;