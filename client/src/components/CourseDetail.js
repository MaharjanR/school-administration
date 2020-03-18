import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends Component{

    state = {
        course: null
    };

    async componentDidMount(){
        const { context } = this.props;

        // path stores the uri of the link i.e. /courses/:id
        const path = this.props.location.pathname;

        // getting the courses info to populate the fields
        const course = await context.data.getCourse(path);
        
        this.setState({
            course
        });
    }


    // To delete the course
    deleteCourse = async () => {

        // gets username, password and url to delete course
        const { context } = this.props;
        const path = this.props.location.pathname;
        const username = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        // calls the delete courses and store results
        const deleteCourse = await context.data.deleteCourses(path, username, password);

        // if the course is deleted the length will be one
        if(deleteCourse.length < 1){
            this.props.history.push(from);
        }
        // if the user doesnt have access goes to forbidden page
        else{
            this.props.history.push('/forbidden')
        }
    }

    render(){
        
        const {course} = this.state;
        const {authenticatedUser} = this.props.context;

        // set the user email to null, and once user is authenticated replaces the null with user email
        let userEmail= null;
        if(authenticatedUser){
            userEmail= authenticatedUser.emailAddress;
        }
        let value;

        // if course is not null, then populate the fields
        if(course){
            
            const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName, emailAddress  } = course;
            value = (<div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    {/* if user email and courses email is same, then only show the update and delete button */}
                                    { 
                                        (emailAddress === userEmail) && 
                                        <span>
                                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                            <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                                        </span>
                                    }
                                    <Link className="button button-secondary" to="/">Return to List</Link>
                                </div>
                            </div>
                        </div>
                        <div className="bounds course--detail">
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{ title }</h3>
                                    <p>By { firstName } { lastName }</p>
                                </div>
                                <div className="course--description">
                                    <ReactMarkdown source={ description } /> 
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <h3> { estimatedTime ? estimatedTime : <p>Unknown</p> } </h3>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <ul>
                                                {/* if materials found then display the materials otherwise display none */}
                                                { (materialsNeeded) ?  <ReactMarkdown source={ materialsNeeded } /> : <li>None</li>}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
        }
        // if user value is none, then the page is loading as the user data is being fetched from API
        else{
            value = (<div>Loading....</div>)
        }

        return(
            <React.Fragment>
                { value }
            </React.Fragment>
        )
    }
}