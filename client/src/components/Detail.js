import React, { Component } from 'react';


export default class Detail extends Component{

    state = {
        course: null
    };

    async componentDidMount(){
        const { context } = this.props;
        // path stores the uri of the link i.e. /courses/:id
        const path = this.props.location.pathname;

        const temp = await context.data.getCourse(path);
        console.log(temp);
        
        this.setState({
            course: temp
        });
        
        // console.log(this.state.course);
    }

    render(){
        
        const {course} = this.state;
        console.log(course);
        let value;

        if(course){
            const { title, description, estimatedTime, materialsNeeded, firstName, lastName  } = course;
            console.log(title);
            value = (<div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    <span>
                                        <a className="button" href="update-course.html">Update Course</a>
                                        <a className="button" href="#">Delete Course</a>
                                    </span>
                                    <a className="button button-secondary" href="index.html">Return to List</a>
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
                                            <h3> { estimatedTime } </h3>
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