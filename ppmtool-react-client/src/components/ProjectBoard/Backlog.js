import React, { Component } from 'react';
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';

class Backlog extends Component {
    render() {
        const {project_tasks_prop} = this.props;

        const tasks = project_tasks_prop.map(project_task => (
            <ProjectTaskItem key={project_task.id} projectTask = {project_task}/>
        ));

        let todoItems=[];
        let inProgressItems=[];
        let doneItems=[];

        for(let i=0;i < tasks.length ; i++){

            if(tasks[i].props.projectTask.status==="TO_DO"){
                todoItems.push(tasks[i]);
            }else if(tasks[i].props.projectTask.status==="IN_PROGRESS"){
                inProgressItems.push(tasks[i])
            }else{
                doneItems.push(tasks[i])
            }
        }

        return (
            <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                            {
                                todoItems
                            }
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-primary text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {
                                inProgressItems
                            }
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {
                                doneItems
                            }
                        </div>
                    </div>
                </div>
        )
    }
}

export default Backlog;