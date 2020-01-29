import React, { Component } from 'react';

export default class Header extends Component {

  render(){

    console.log(this.props.context.authenticatedUser);
    return(
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><a className="signup" href="signup">Sign Up</a><a className="signin" href="signin">Sign In</a></nav>
        </div>
      </div>
    )
  }
  
}