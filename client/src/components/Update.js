import React, { Component } from 'react';

export default class Update extends Component {

    state = {
        course: null
    };

    async componentDidMount(){
        const { context } = this.props;
        // path stores the uri of the link i.e. /courses/:id
        const path = this.props.location.pathname;

        const course = await context.action.getCourse(path);
        
        this.setState({
            course
        });
        
    }
    render(){
        return(
           
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
                                        placeholder="Course title..." 
                                    />
                                </div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description...">
                                        While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            {/* <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials...">
                                                * 1/2 x 3/4 inch parting strip
                                            </textarea> */}
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
        )
    }
}