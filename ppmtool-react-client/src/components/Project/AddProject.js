import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';

class AddProject extends Component {

    constructor() {
        super();

        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: " ",
            start_date: "",
            end_date: "",
            errors:{}
        }
    }

    //Lifecycle Methods

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }


    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        this.props.createProject(newProject, this.props.history);
    }

    render() {
        const {errors} = this.state; 
        return (
            <div> 
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create Project</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className={errors.projectName!=null? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                                            placeholder="Project Name"
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.onChange}
                                        />
                                       {
                                           errors.projectName && (
                                               <div className="invalid-feedback">{errors.projectName}</div>
                                           )
                                       }
                                    </div>
                                    <div className="form-group">
                                    <input type="text" className={errors.projectIdentifier!=null? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                                            placeholder="Unique Project Id"
                                            name="projectIdentifier"
                                            value={this.state.projectIdentifier}
                                            onChange={this.onChange}
                                        />
                                        {
                                           errors.projectIdentifier && (
                                               <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                           )
                                       }
                                    </div>
                                    <div className="form-group">
                                        <textarea type="text" className={errors.description!=null? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                                            placeholder="Project Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}></textarea>
                                          {
                                             errors.projectIdentifier && (
                                               <div className="invalid-feedback">{errors.projectIdentifier}</div>)
                                          }
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg"
                                            name="start_date"
                                            value={this.state.start_date}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg"
                                            name="end_date"
                                            value={this.state.end_date}
                                            onChange={this.onChange} />
                                    </div>

                                    <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    errors:state.errors
});



export default connect(
    mapStateToProps,
    { createProject }
)(AddProject);
