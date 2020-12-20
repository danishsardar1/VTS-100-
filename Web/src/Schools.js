
import React, {Component} from "react";
import Firebase from 'firebase';
import { MDBCol, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import {db} from "./Firebase";



class Schools extends React.Component {
  constructor(props) {
      
      super(props);
     
      this.ref = db.collection("contacts");
      this.unsubscribe = null;
      this.state = {
        contacts : []
      };
      }
      
    componentDidMount() {
     
     
       this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
   }
    
  onCollectionUpdate = (querySnapshot) => {
    const contacts = [];
    querySnapshot.forEach((doc) => {
      const { cName, cEmail, cPhone, cMessage } = doc.data();
      contacts.push({
        key:doc.id,
        doc,
        cName,
        cEmail,
        cPhone,
        cMessage
      });
    });
  
    this.setState({
      contacts
    });
  }


  //////pagination

 
  
    render(){
    return (
      <div className="MainDiv">
       <div className = "container-fluid nav_bg">
       <br></br>
          <div className= "row">
          <br></br>
           <div className= "col-9 mx-auto"> 
               <div className= "row">

                 
               <br></br>
       <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
        
         </div>
         <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
       </div>
       <br></br>
    
     </div>

     <br></br>


     


 
      
        {/* <div className="container"> */}
        
            <table id="example" className="display table ">

              <thead className="thead-dark">
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                  </tr>
              </thead>
              <tbody>
              {this.state.contacts.map(contact => {
                  
                  return (
                      <tr>     
                      <td>{contact.cName}</td>
                      <td>{contact.cEmail}</td>
                      <td>{contact.cPhone}</td>
                      <td>{contact.cMessage}</td>
                      </tr>
                      
                  );
                 
                  })}
          
                 
              </tbody>
              
           </table>
            
       </div>
      </div>
      </div>
      </div>
      
    );
  }
  }





















// const Schools = () => {
//   return (
//     <div className = "container-fluid nav_bg">
//           <div className= "row">
//               <div className= "col-10 mx-auto"> 
//               <div className= "row">
//     <MDBCol md="10" className= 'search'>
//       <div className="input-group md-form form-sm form-1 pl-0">
//         <div className="input-group-prepend">
//           <span className="input-group-text blue lighten-3" id="basic-text1">
//             <MDBIcon className="text-white" icon="search" />
//           </span>
//         </div>
//         <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
//       </div>
//     </MDBCol>
//     </div>
//     </div>
//     </div>
// </div>
// );

// }

// class Schools extends Component {

//   constructor(props) {
//       super(props);
//       this.state = {
//           users: [],
//           userId: ''
//       };
//   }
  
  
//   viewUser = () => {
//     // const db1 = firebase.firestore();
//     db.settings({ timestampsInSnapshots: true });
//     db.collection('contacts').get().then((snapshot) => {
//         snapshot.forEach(data => {
//             if (data.exists) {
//                 // let user = data.data();
//                 // this.setState({ user: user});
//                 // console.log("user state updated: ",user)
//                 // console.log("user name: ",user);
//      this.setState(prevState => ({
//   contacts: [...prevState.contacts,data.data()]
// }));
//    console.log(this.state.contacts)


//             } else {
//                 // this.setState({user: null});
//                 console.log("No data");
//             }

//         })
//     })
//     console.log('item clicked');
// }
  
  
//   render() {
//       // let userUI = this.state.user ? <span>No User data</span> : <pre>{JSON.stringify(this.state.user)}</pre>;
//       let userUI = this.state.contacts ? <span>No User data</span> : 
//               <table>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Message</th>
//                   </tr>
//                   {this.state.contacts.map(contact =>
//                      <tr>
//                       <td>{contact.Name}</td>
//                     <td>{contact.cEmail}</td>
//                     <td>{contact.cPhone}</td>
//                     <td>{contact.cMessage}</td>
//                      </tr> 
//                   )}
  
//               </table>;
  
//       return(
//           <div>
//               <h1>Manager Dashboard</h1>
//               <button>Add Parking Area</button> 
//               <button>View Booking</button>
//               <button onClick={this.viewFeedback}>View Feedback</button>
//               <button onClick={this.viewUser}>View User</button>
//               <button onClick={this.logout}>logout</button>
  
//               <div>
//                   <h3>View Users</h3>
//                   {userUI}
//               </div>
  
//           </div>
//       )
//   }
//   }













{/* <footer className="page-footer font-small blue" id = "footer">


<div className="footer-copyright text-center py-3">© 2020 Copyright:
  <NavLink to="/Home"> VanTrackingSystem.com</NavLink>
</div>


</footer> */}

export default Schools;







