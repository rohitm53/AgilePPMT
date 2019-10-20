import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div class="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Persoanl Project Management Tool</h1>
                                <p className="lead">Create your account to join active projects or start you own</p>
                                <hr />
                                <Link to="/register" className="btn btn-primary mr-4">Sign Up</Link>
                                <Link to="/login" className="btn btn-secondary">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
