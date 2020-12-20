import React from "react";
import web from "../src/Images/main.png"
import { NavLink } from "react-router-dom";

const Home = ()=> {
    return (
      <>

      <section id = "header" className ="d-flex align-items-center">

      <div className = "container-fluid">
          <div className= "row">
              <div className= "col-10 mx-auto"> 
              <div className= "row">
                  <div className ="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                    <h1>Keep an eye on Drivers with <strong className = "brand-name">Van Tracking System </strong></h1>
                    <h2 className="my-3"> Hire Drivers online</h2>
                    <div className = "mt-3">
                      <a href = "./Services" className = "btn-get-started"> Get Started</a>
                    </div>
                  </div>

                  <div className= "col-lg-6 order-1 order-lg-2 header-img">
                    <img src = {web} className="img-fluid animated" alt = "home img"/>
                  </div>
                  </div>
            </div>
            </div>
          </div>
        


      </section>
      <footer className="page-footer font-small blue" id = "footer">


<div className="footer-copyright text-center py-3">© 2020 Copyright:
  <NavLink to="/Home"> VanTrackingSystem.com</NavLink>
</div>


</footer>
      </>
  )
};

export default Home;