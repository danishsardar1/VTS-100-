import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Schools from "./Schools";
import Request from "./Request";
import Login from "./Login";
import Navbar from "./Navbar";
import Services from "./Services";
import Contact from "./Contact";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import { Switch, Route, Redirect } from 'react-router-dom';

const App = ()=> {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path ="/" component = {Home}/>
      <Route exact path ="/login" component = {Login}/>
      <Route exact path ="/schools" component = {Schools}/>
      <Route exact path ="/request" component = {Request}/> 
      <Route exact path ="/contact" component = {Contact}/>
      <Route exact path ="/services" component = {Services}/>
      <Redirect to= "/"/>

    </Switch>
    
    </>
  )
};









//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
