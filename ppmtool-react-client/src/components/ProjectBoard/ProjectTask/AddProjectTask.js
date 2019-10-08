import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AddProjectTask extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${id}`} className="btn btn-secondary text-white">Back to Project Board</Link>
                        <h4 className="display-4 text-center">Add Project Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>

                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Project Task Summary" />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control form-control-lg"
                                    placeholder="Summary"></textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg">
                                    <option value="{0}">Select Priority</option>
                                    <option value="{1}">High</option>
                                    <option value="{2}">Medium</option>
                                    <option value="{3}">Low</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg">
                                    <option value="{0}">Select Status</option>
                                    <option value="{1}">TO DO</option>
                                    <option value="{2}">IN PROGRESS</option>
                                    <option value="{3}">DONE</option>
                                </select>
                            </div>
                            <button className="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default AddProjectTask;
