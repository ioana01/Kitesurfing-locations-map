import React, { Component } from 'react';
import './Login.css';
import { postLogin } from '../../helpers/apis';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: "",
                error: "Pune la dispoziție un numele de utilizator"
            },
            password: {
                value: "",
                error: "Completează parola pentru acest cont"
            },
            loginError: "",
            resetError: ""
        };

        this.loginToServer = this.loginToServer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToKite = this.redirectToKite.bind(this);
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
            postLogin(loginParams, this.redirectToKite, this.setSubmissionFail);
        } else {
            if(!document.getElementById("username").value) {
                alert("Please insert your username");
            } else if(!document.getElementById("password").value) {
                alert("Please insert your password");
            } else {
                alert("Please insert your credentials");
            }
        }
        
	}

    redirectToKite() {
        setTimeout(() => {
            window.location.href = "/kite";
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
        return (
            <div id="loginContainer">
                <h1 id="title">Kite</h1>
                <form className="formFields">
                    <label className="formLabel" for="username">Username</label>
                    <input className="formInput" 
                            value={this.state.username.value} 
                            onChange={this.handleChange('username')}
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Your username.."></input>

                    <label className="formLabel" for="password">Password</label>
                    <input className="formInput" 
                            value={this.state.password.value} 
                            onChange={this.handleChange('password')}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Your password.."></input>
                
                    <input id="loginBtn" onClick={this.handleSubmit} type="submit" value="Login"></input>
                </form>
            </div>
        )
    };
}

export default Login;