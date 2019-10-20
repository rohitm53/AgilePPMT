import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Email Adress"
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg"
                                        placeholder="Password"
                                    />
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

export default Login;
