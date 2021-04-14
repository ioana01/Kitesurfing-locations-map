import React, { Component } from 'react';
import '../Login/FormPage.css';
import { postRegister, getUsers } from '../../helpers/apis';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: "",
                error: "Pune la dispoziție un nume de utilizator"
            },
            email: {
                value: "",
                error: "Completează emailul pentru acest cont"
            },
            password: {
                value: "",
                error: "Completează parola pentru acest cont"
            },
            users: []
        };

        this.registerUser = this.registerUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.setUsers = this.setUsers.bind(this);
    }

    componentDidMount () {
        getUsers(this.setUsers);
    }

    setUsers(usersList) {
        this.setState({users: usersList});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.registerUser();
    }

    registerUser = function() {
        let check, i;
        let registerParams = {
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value,
            id: this.state.users[this.state.users.length - 1].id + 1
        };

        if(document.getElementById("username").value  && 
            document.getElementById("password").value &&
            document.getElementById("email").value) {

            check = 0;
            for(i = 0; i < this.state.users.length; i++) {
                if(this.state.users[i].email === registerParams.email) {
                    check = 1;
                }
            }

            if(check) {
                alert("Already exists an account for this email");
            } else {
                this.state.users.push(registerParams);
                postRegister(registerParams, this.redirectToLogin);
            }
        } else {
            if(!document.getElementById("username").value) {
                alert(this.state.username.error);
            } else if(!document.getElementById("email").value) {
                alert(this.state.email.error);
            } else if(!document.getElementById("password").value) {
                alert(this.state.password.error);
            } else {
                alert("Please insert your credentials");
            }
        }
        
	}

    redirectToLogin() {
        setTimeout(() => {
            window.location.href = "/login";
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

                    <label className="formLabel">Email</label>
                    <input className="formInput" 
                            value={this.state.email.value} 
                            onChange={this.handleChange('email')}
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Your email.."></input>

                    <label className="formLabel">Password</label>
                    <input className="formInput" 
                            value={this.state.password.value} 
                            onChange={this.handleChange('password')}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Your password.."></input>

                    <p>Already have an account? <a href="#" id="registerLink" onClick={this.redirectToLogin}>Login</a></p>
                    <input id="sendBtn" onClick={this.handleSubmit} type="submit" value="Register"></input>
                </form>
            </div>
        )
    };
}

export default Register;