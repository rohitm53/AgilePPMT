import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../../actions/securityActions';

class Header extends Component {

    logOut() {
        this.props.logOut();
        window.location.href = "/";
    }

    render() {

        const { user, validToken } = this.props.security;

        const userIsNoAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </ul>
            </div>
        );
        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fa fa-user-circle mr-1">  {user.fullName}</i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link"
                            onClick={this.logOut.bind(this)}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );


        let headerLink;

        if (validToken && user) {
            headerLink = userIsAuthenticated
        } else {
            headerLink = userIsNoAuthenticated
        }


        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <Link to="/dashboard" className="navbar-brand">
                            Personal Project Management Tool
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {headerLink}

                    </div>

                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    security: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, { logOut })(Header);