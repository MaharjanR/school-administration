import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  render(){

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    console.log(authUser);

   return(
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo"> <Link to='/'>Courses</Link></h1>
          <nav>
            { !authUser ? 
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
              :
              <Link className="signout" to="/signout">Sign Out</Link>
            }  
          </nav>
        </div>
      </div>
    )
  }
  
}