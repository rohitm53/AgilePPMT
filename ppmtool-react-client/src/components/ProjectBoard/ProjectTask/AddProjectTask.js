import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {addProjectTask} from '../../../actions/backlogAction';
import PropTypes from 'prop-types';

export class AddProjectTask extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state={
            summary:"",
            acceptanceCriteria:"",
            dueDate:"",
            priority:0,
            status:"",
            projectIdentifier:id,
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const projectTask = {
            summary:this.state.summary,
            acceptanceCriteria:this.state.acceptanceCriteria,
            dueDate:this.state.dueDate,
            priority:this.state.priority,
            status:this.state.status,
        }
        this.props.addProjectTask(this.state.projectIdentifier,projectTask,this.props.history);
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-8 m-auto">
                        <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn btn-secondary text-white">Back to Project Board</Link>
                        <h4 className="display-4 text-center">Add Project Task</h4>
                        <p className="lead text-center">Project Name + Project Code</p>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                    className={errors.summary!=null?
                                                                    "form-control form-control-lg is-invalid"   :
                                                                    "form-control form-control-lg"}
                                    placeholder="Project Task Summary"
                                    name="summary" 
                                    value={this.state.summary}  
                                    onChange={this.onChange}  
                                    />
                                {
                                    errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )
                                }   
                            </div>
                            <div className="form-group">
                                <textarea className="form-control form-control-lg"
                                    placeholder="Acceptance Criteria"
                                    name="acceptanceCriteria"
                                    value={this.state.acceptanceCriteria}    
                                    onChange={this.onChange}>
                                </textarea>
                            </div>
                            <h6>Due Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg"
                                       name="dueDate"
                                       value={this.state.dueDate}    
                                       onChange={this.onChange}  
                                    />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg" 
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}>
                                    <option value="{0}">Select Priority</option>
                                    <option value="1">High</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Low</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}>
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
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

AddProjectTask.propTypes = {
    addProjectTask:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state=>({
    errors:state.errors
});

export default connect(mapStateToProps,{addProjectTask})(AddProjectTask);
