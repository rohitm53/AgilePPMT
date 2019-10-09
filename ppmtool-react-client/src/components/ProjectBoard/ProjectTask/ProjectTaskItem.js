import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ProjectTaskItem extends Component {
    render() {
        const {projectTask,projectIdentifier}  = this.props;

        let priorityString;
        let priorityClass;
 
        if(projectTask.priority===1){
            priorityClass="bg-danger text-light";
            priorityString="HIGH";
        }else if(projectTask.priority===2){
            priorityClass="bg-warning text-light";
            priorityString="MEDIUM";
        }else{
            priorityClass="bg-info text-light";
            priorityString="LOW";
        }

        return (
            <div>
                <div className="card mb-2 bg-light">
                    <div className={`card-header text-primary ${priorityClass}`}>
                        ID: {projectTask.projectSequence} -- Priority: {priorityString}
                    </div>
                    <div className="card-body bg-light">
                        <h5 className="card-title">{projectTask.summary}</h5>
                        <p className="card-text text-truncate">{projectTask.acceptanceCriteria}</p>
                        <Link to={`/updateProjectTask/${projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">View / Update</Link>
                        <button className="btn btn-danger ml-4">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectTaskItem;
