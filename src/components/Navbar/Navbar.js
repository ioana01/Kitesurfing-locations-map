import React, { Component } from 'react';
import './Navbar.css'
import { deleteUser, getUserData, getFavoriteData } from '../../helpers/apis'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.redirectToRegister = this.redirectToRegister.bind(this);
        this.closeAccount = this.closeAccount.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.userInfo = this.userInfo.bind(this);
    } 

    userInfo() {
        getUserData(this.props.userId, this.showUserInfo);
    }

    showUserInfo(data) {
        this.props.setUserInfo(data.data);
    }

    closeAccount() {
        deleteUser(this.props.userId, this.redirectToRegister);
    }

    redirectToRegister() {
        setTimeout(() => {
            window.location.href = "/register";
        }, 100);
    }

    redirectToLogin() {
        setTimeout(() => {
            window.location.href = "/login";
        }, 100);
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" id="kite">Kite</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" id="kite"><span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <ul className="navbar-nav">
                            <li>
                                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" id="addSpot">ADD SPOT</button>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle profile" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Profile
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a onClick={this.userInfo} className="dropdown-item" id="userInfoButton" href="#" data-toggle="modal" data-target="#myModalInfo">User Info</a>
                                    <a onClick={this.closeAccount} className="dropdown-item" id="closeButton" href="#">Close account</a>
                                    <a onClick={this.redirectToLogin} className="dropdown-item" id="logoutButton" href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </span>
                </div>
            </nav>
        )
    };
}

export default Navbar;