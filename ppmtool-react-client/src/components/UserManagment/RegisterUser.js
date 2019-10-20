import React, { Component } from 'react'

class RegisterUser extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Register User</h1>
                        <p className="lead text-center">Create your account</p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <input type="submit" value="Register" className="btn btn-info btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterUser;
