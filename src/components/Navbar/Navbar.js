import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    redirectToLogin() {
        setTimeout(() => {
            window.location.href = "/login";
        }, 100);
    }

    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#" id="kite">Kite</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#" id="kite"><span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <ul class="navbar-nav">
                            <li>
                                <button onClick={this.props.addSpotFunc} type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" id="addSpot">ADD SPOT</button>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle profile" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Profile
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" onClick={this.redirectToLogin}>
                                    <a class="dropdown-item" id="logoutButton" href="#">Logout</a>
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