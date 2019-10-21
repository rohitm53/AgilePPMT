import React, { Component } from 'react';
import {creatNewUser} from '../../actions/securityActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class RegisterUser extends Component {

    constructor() {
        super();
        this.state={
            userName:'',
            fullName:'',
            password:'',
            confirmPassword:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e)=> {
        e.preventDefault();

        const newUser = {
            userName:this.state.userName,
            fullName:this.state.fullName,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
           
        }
        this.props.creatNewUser(newUser,this.props.history)
    }

    

    render() {
        const {errors} = this.state;
        const errorClass = "form-control form-control-lg is-invalid";
        const normalClass = "form-control form-control-lg";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Register User</h1>
                        <p className="lead text-center">Create your account</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className={errors.fullName!=null?errorClass:normalClass}
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={this.state.fullName}
                                    onChange={this.onChange}
                                />
                                {
                                    errors.fullName && (
                                        <div className="invalid-feedback">{errors.fullName}</div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <input type="email" className={errors.userName!=null?errorClass:normalClass}
                                    placeholder="Email Address"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.onChange}
                                />
                                 {
                                    errors.userName && (
                                        <div className="invalid-feedback">{errors.userName}</div>
                                    )
                                 }
                            </div>
                            <div className="form-group">
                                <input type="password" className={errors.password!=null?errorClass:normalClass}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                 {
                                    errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )
                                 }
                            </div>
                            <div className="form-group">
                                <input type="password" className={errors.confirmPassword!=null?errorClass:normalClass}
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                />
                                {
                                    errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )
                                 }
                            </div>
                            <input type="submit" value="Register" className="btn btn-info btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

RegisterUser.propTypes = {
    creatNewUser:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProp = state => ({
    errors:state.errors
});

export default connect(mapStateToProp,{creatNewUser})(RegisterUser);
