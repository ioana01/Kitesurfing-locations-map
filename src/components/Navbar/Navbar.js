import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#" id="kite">Kite <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <button onClick={this.props.addSpotFunc} type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" id="addSpot">ADD SPOT</button>
                        <button id="lineBtn" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </span>
                </div>
            </nav>
        )
    };
}

export default Navbar;