import React, { Component } from 'react';
import './FormPage.css';
import { postLogin } from '../../helpers/apis';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: "",
                error: "Pune la dispoziție un nume de utilizator"
            },
            password: {
                value: "",
                error: "Completează parola pentru acest cont"
            },
            id: -1
        };

        this.loginToServer = this.loginToServer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUserId = this.setUserId.bind(this);
        this.redirectToRegister = this.redirectToRegister.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.loginToServer();
    }

    loginToServer = function() {
        let loginParams = {
            username: this.state.username.value,
            password: this.state.password.value
        };

        if(document.getElementById("username").value  && document.getElementById("password").value) {
            postLogin(loginParams, this.setUserId);
        } else {
            if(!document.getElementById("username").value) {
                alert(this.state.username.error);
            } else if(!document.getElementById("password").value) {
                alert(this.state.password.error);
            } else {
                alert("Please insert your credentials");
            }
        }
        
	}

    setUserId(response) {
        this.setState({id: response.data.id});
    }

    redirectToRegister() {
        setTimeout(() => {
            window.location.href = "/register";
        }, 100);
    }

    handleChange = input => e => {
        let newData = {
            value: e.target.value,
            error: this.state[input].error
        }
        this.setState({[input]:newData});
    };

    render() {
        if(this.state.id !== -1) {
            let id = this.state.id;
            return <Redirect
                        to={{
                        pathname: "kite",
                        state: { id: id }}}/>
        }

        return (
            <div id="Container">
                <h1 id="title">Kite</h1>
                <form className="formFields">
                    <label className="formLabel">Username</label>
                    <input className="formInput" 
                            value={this.state.username.value} 
                            onChange={this.handleChange('username')}
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Your username.."></input>

                    <label className="formLabel">Password</label>
                    <input className="formInput" 
                            value={this.state.password.value} 
                            onChange={this.handleChange('password')}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Your password.."></input>
                    <p>Don't have an account yet? <a href="#" id="registerLink" onClick={this.redirectToRegister}>Register</a></p>
                    <input id="sendBtn" onClick={this.handleSubmit} type="submit" value="Login"></input>
                </form>
            </div>
        )
    };
}

export default Login;