import React, { Component } from 'react';

export default class Update extends Component {
    state = {
        course: null
    };

    async componentDidMount(){
        const { context } = this.props;

        // path stores the uri of the link i.e. /update/:id/courses
        const path = this.props.location.pathname;
        const course = await context.action.getCourse(path);
        
        this.setState({
            course
        });
    }

    handleChange = (event) => {
        const { value } = event.target;
        const { name } = event.target;

        const coursesName = `course.${name}`;
        console.log(name)
        console.log(this.state.course[name]);   
        this.setState( () =>{
            console.log(coursesName);
            return{
                coursesName: value
            }
        });
      }

    render(){
        let value;
        const { course } = this.state;
        // console.log(course);

        if(course){
            const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName  } = course;
            value =  
                <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        value= {title}
                                        onChange= { this.handleChange}
                                    />
                                </div>
                                <p>By { firstName } { lastName }</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder={ description } value='' onChange= { this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" value= { estimatedTime }  onChange= { this.handleChange} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value = { materialsNeeded } onChange= { this.handleChange} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
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