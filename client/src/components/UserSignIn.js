import React, { Component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component{

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    submit = () => {

        const { context } = this.props;
        const { emailAddress, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        // calls the signin function by passing user email and password
        context.action.signIn( emailAddress, password )
            .then( user => {
                // if user is not returned, show errors
                if( user === null){
                    this.setState( () => {
                        return{
                            errors: ['Sign in was unsuccessful']
                        }
                    });
                }
                // if match, sign in
                else{
                    this.props.history.push(from);
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                  }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    }

    // redirects to the homepage
    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {
        // saved the value to state when changed
        const {name} = event.target;
        const {value} = event.target;

        this.setState( () => {
            return{
                [name]: value
            }
        })
    }
    
    render(){

        // calls the errors from state to send it to form
        const { errors } = this.state;

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                    <div>
                        <Form cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <React.Fragment>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} />
                                </React.Fragment>                        
                        )} />
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}