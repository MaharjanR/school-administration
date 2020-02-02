import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component{

  constructor(){
    super();
    this.data = new Data();
  }
  
  state = {
    authenticatedUser:  Cookies.getJSON('authenticatedUser') || null
  };

  signIn = async (emailAddress, password) => {
    
    const user = await this.data.getUser( emailAddress, password);
  
    if(user !== null){
      this.setState( () => {
        return{
          authenticatedUser: user
        }
      });
      
      // set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = async () => {
    console.log('cookies has been removed');
    Cookies.remove('authenticatedUser');
  }

  getCourse = async (id) => {
    const course = `/courses/${id}`;
    return this.data.getCourse(course);
  }

  render(){
    const authenticatedUser = this.state.authenticatedUser;
    
    const value = {
      authenticatedUser,
      data: this.data,
      action: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourse: this.getCourse
      }
    };


    return(
      <Context.Provider value = {value}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
