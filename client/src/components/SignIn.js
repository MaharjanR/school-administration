import React, { Component } from 'react';
import Form from './Form';

export default class SignIn extends Component{

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };

        context.action.signIn( emailAddress, password )
            .then( user => {
                if( user === null){
                    this.setState( () => {
                        return{
                            errors: ['Sign in was unsuccessful']
                        }
                    });
                }
                else{
                    this.props.history.push(from);
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                  }
            })
            .catch( err => {
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {
        const {name} = event.target;
        const {value} = event.target;

        this.setState( () => {
            return{
                [name]: value
            }
        })
    }
    
    render(){

        const {
            emailAddress,
            password,
            errors
        } = this.state;

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
                    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
        )
    }
}