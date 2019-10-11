import React, { Component } from 'react';
import CreateProjectTaskButton from './CreateProjectTaskButton';

import {getBacklog} from '../../actions/backlogAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Backlog from './Backlog';

class ProjectBoard extends Component {
    constructor() {
        super();
        this.state={
            errors:{}
        }
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }
    
    render() {
        const { id } = this.props.match.params;
        const {project_tasks} = this.props.backlog;
        const {errors}  = this.state;

        let BoardContent;

        const boardAlgorithm = (errors,project_tasks) => {
            if(project_tasks.length===0){
                if(errors.projectNotFound){
                    return(<div className="alert alert-danger text-center" role="alert">
                             {errors.projectNotFound}
                    </div>);
                }else{
                    return(<div className="alert alert-info text-center" role="alert">
                         No Project Task on this board
                    </div>);
                }
            }else{
                return (<Backlog project_tasks_prop={project_tasks}/>);
            }
        }

        BoardContent = boardAlgorithm(errors,project_tasks);


        return (
            <div className="container">
                <CreateProjectTaskButton id={id} />
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}

ProjectBoard.propTypes={
    backlog:PropTypes.object.isRequired,
    getBacklog:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProp = state =>({
    backlog:state.backlog,
    errors:state.errors
})

export default connect(mapStateToProp,{getBacklog})(ProjectBoard);
