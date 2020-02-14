import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Detail extends Component{

    state = {
        course: null
    };

    async componentDidMount(){
        const { context } = this.props;

        // path stores the uri of the link i.e. /courses/:id
        const path = this.props.location.pathname;
        // getting only the id from the path
        const id = context.action.getId(path);
        const course = await context.data.getCourse(`/courses/${id}`);
        
        this.setState({
            course
        });
    }

    render(){
        
        const {course} = this.state;

        let value;

        if(course){
            const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName  } = course;
            value = (<div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    <span>
                                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                        <Link className="button" to="#">Delete Course</Link>
                                    </span>
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
                                    <p> { description } </p>
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
                                                { (materialsNeeded) ?  <li>{ materialsNeeded }</li> : <li>None</li>}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
        }
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