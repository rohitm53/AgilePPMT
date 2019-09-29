import React, { Component } from 'react'
import ProjectItem from './Project/ProjectItem'
import CreateProjectButtom from './Project/CreateProjectButtom';

class Dashboard extends Component {
    render() {
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
                                <ProjectItem />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
