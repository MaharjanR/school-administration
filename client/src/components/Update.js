import React, { Component } from 'react';
import Form from './Form';
import { Redirect } from 'react-router-dom';

export default class Update extends Component {
    state = {
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        firstName: '',
        lastName: '',
        errors: ''
    };

    async componentDidMount(){
        const { context } = this.props;

        // path stores the uri of the link i.e. /update/:id/courses
        const path = this.props.location.pathname;
        // getting only the id from the path
        const pathInt = context.action.getId(path);
        const course = await context.data.getCourse(`/courses/${pathInt}`);
        
        const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName  } = course;

        this.setState({
            id, 
            title,
            description,
            estimatedTime,
            materialsNeeded,
            firstName, 
            lastName
        });
    }

    handleChange = (event) => {
        const { value } = event.target;
        const { name } = event.target;

        this.setState( () =>{
            return{
                [name]: value
            }
        });
      }

    submit = async () => {

        const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName  } = this.state;
        const { context } = this.props;
        
        const update = await context.data.updateCourses(`/courses/${id}`, {id, title, description, estimatedTime, materialsNeeded, firstName, lastName});
        console.log(update);
        if(update){
            console.log('Successfully updated');
        }
        else{
            console.log(update);
        }
    }
 
        
    cancel = () => {
        this.props.history.push('/');
     }
 

    render(){
        let value;
        const {  id, title, description, estimatedTime, materialsNeeded, firstName, lastName, errors } = this.state;

        const user = this.props.context.authenticatedUser; 
        const userId = user.id;
        console.log(id);
        console.log(userId);

        if(id){
            if(userId === id){
                value =  
                <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                        submit={ this.submit } 
                        cancel={ this.cancel }
                        submitButtonText = 'Update'
                        errors= { errors }
                        elements={ () => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" className="input-title course--title--input" value= { title } onChange= { this.handleChange} />
                                        </div>
                                        <p>By { firstName } { lastName }</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea id="description" name="description" className="" placeholder={ description } value={ description } onChange= { this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" value= { estimatedTime ? estimatedTime : '' }  onChange= { this.handleChange} />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" value = { materialsNeeded ? materialsNeeded : '' } onChange= { this.handleChange} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )} />
                    </div>
                </div>
            }
            else{
               console.log('something happens');
               value = <Redirect to='/forbidden' />
            }
        }
        else{
            value = <p>Loading...</p>
        }

        return(
            <React.Fragment>
                { value }
           </React.Fragment>
        )
    }
}