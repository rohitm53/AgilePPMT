import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ProjectTaskItem extends Component {
    render() {
        return (
            <div>
                <div className="card mb-1 bg-light">
                    <div className="card-header text-primary">
                        ID:Project Sequence --Priority String
                                </div>
                    <div className="card-body bg-light">
                        <h5 className="card-title">Project Task Summary</h5>
                        <p className="card-text text-truncate">Project Task Acceptance Criteria</p>
                        <Link to="#" className="btn btn-primary">View / Update</Link>
                        <button className="btn btn-danger ml-4">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectTaskItem;
