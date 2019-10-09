import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProjectTask} from '../../../actions/backlogAction';



class UpdateProjectTask extends Component {

    constructor(props){
        super(props);
        this.state={
            project_task:{}
        }
    }

    componentDidMount(){
        const {id,pt_seq}=this.props.match.params;
        this.props.getProjectTask(id,pt_seq);
    }

    render() {
        return (
            <div>
                <h1>Update Project Task</h1>
            </div>
        )
    }
}

UpdateProjectTask.propTypes={
    backlog:PropTypes.object.isRequired,
    getProjectTask:PropTypes.func.isRequired
}

const mapStateToProp = state =>({
    backlog:state.backlog
});

export default connect(mapStateToProp,{getProjectTask})(UpdateProjectTask);
