import React, { Component } from 'react'
import ProjectItem from './Project/ProjectItem'
import CreateProjectButtom from './Project/CreateProjectButtom';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import PropTypes from 'prop-types';

class Dashboard extends Component {

    ///Life cycle hook

    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const projects = this.props.project.projects;
        return (
            <div>
                <div className="projects">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="diaplay-4 text-center">Projects</h1>
                                <br />
                                <CreateProjectButtom />
                                <hr />
                                {
                                    projects.map((project) => {
                                        return (<ProjectItem key={project.id} project={project} />);
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStatetoProp = state => ({
    project: state.project
})

export default connect(mapStatetoProp, { getProjects })(Dashboard);
