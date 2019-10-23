import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../actions/securityActions';
import { connect } from 'react-redux';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const loginRequest = {
            userName: this.state.userName,
            password: this.state.password
        }
        this.props.login(loginRequest);
    }

    render() {
        const { errors } = this.state;
        const normalClass = "form-control form-control-lg";
        const errorClass = "form-control form-control-lg is-invalid";
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={errors.userName != null ? errorClass : normalClass}
                                        placeholder="User name"
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
                                    <input type="password" className={errors.password != null ? errorClass : normalClass}
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
                                <input type="submit" value="Log In" className="btn btn-info btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
    errors: state.errors,
    security: state.security
});


export default connect(mapStateToProp, { login })(Login);
