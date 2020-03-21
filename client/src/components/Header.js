import React from 'react';
import { Link } from 'react-router-dom';

export default ({context}) => {


  // gets the logged user
  const authUser = context.authenticatedUser;

  return(
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"> <Link to='/'>Courses</Link></h1>
        <nav>
          {/* if user is not logged, show signup & signin */}
          { !authUser ? 
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <span>Welcome {authUser.firstName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          }  
        </nav>
      </div>
    </div>
  )
  
  
}