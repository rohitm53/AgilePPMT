import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <a href="Dashboard.html" className="navbar-brand">
                            Personal Project Management Tool
                        </a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a href="/dashboard" className="nav-link">Dashboard</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="register.html" className="nav-link">SignUp</a>
                                </li>
                                <li className="nav-item">
                                    <a href="login.html" className="nav-link">Login</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </nav>
            </div>
        )
    }
}

export default Header;