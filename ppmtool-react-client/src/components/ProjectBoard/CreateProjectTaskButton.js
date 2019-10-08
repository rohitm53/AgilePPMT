import React from 'react';
import { Link } from 'react-router-dom';

const CreateProjectTaskButton = (props) => {
    return (
        <React.Fragment>
            <Link to={`/addProjectTask/${props.id}`} className="btn btn-primary mb-3">
                <i className="fa fa-plus-circle"> Creat Project Task</i>
            </Link>
        </React.Fragment>
    );
}

export default CreateProjectTaskButton;

