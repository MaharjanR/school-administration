import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component{

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    submit = () => {
        // gets the value from state and props
        const { context } = this.props;
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

        // creaes a user object to send to API
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        // if both password matches then create user
        if( password === confirmPassword){
            // calls the createUser from API passing the user data
            context.data.createUser(user)
            .then( errors => {
                // if errors present, display errors
                if (errors.length) {
                    this.setState({ errors });
                }
                else {
                    // create account and sign in
                    context.action.signIn(emailAddress, password)
                    .then(() => {
                        this.props.history.push('/');    
                    });
                }
                })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });    
        }
        
        // if password doesnt match, save errors to the state
        else{
            this.setState( {
                errors: ["Password doesnt match"]
            });
        }
        
    }

    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {

        // when name and value is changed
        const {name} = event.target;
        const {value} = event.target;

        this.setState( () => {
            return{
                [name]: value
            }
        })
    }
    
    render(){

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
                                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.change}/>
                                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.change}/>                                    
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} />
                                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Password" onChange={this.change} />
                                </React.Fragment>                        
                        )} />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
                </div>
            </div>
        )
    }
}