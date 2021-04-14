import React, { Component } from 'react';
import './Kite.css'
import Navbar from '../Navbar/Navbar'
import { getSpotList, 
        getSpotInfo , 
        postNewSpot, 
        getFavoritesList, 
        deleteSpotRequest, 
        postFavoriteSpot, 
        deleteFavoriteSpot,
        updateUser,
        updateSpot,
        updateFavoriteSpot } from '../../helpers/apis';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import Star from './star.png'

class Kite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: [],
            favorites: [],
            L: "",
            map: "",
            markers: [],
            id: -1,
            userInfo: {}
        };

        this.showPinPoints = this.showPinPoints.bind(this);
        this.addSpot = this.addSpot.bind(this);
        this.addPinPoint = this.addPinPoint.bind(this);
        this.deleteSpot = this.deleteSpot.bind(this);
        this.showFavoriteSpots = this.showFavoriteSpots.bind(this);
        this.insertSpotInTable = this.insertSpotInTable.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.search = this.search.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.switchFavorite = this.switchFavorite.bind(this);
        this.hideBtn = this.hideBtn.bind(this);
        this.showBtn = this.showBtn.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    componentDidMount () {
        getFavoritesList(this.showFavoriteSpots);
        getSpotList(this.showPinPoints);

        if(this.props.location.state) {
            this.setState({id: this.props.location.state.id});
        }
    }

    showPinPoints(pinList) {
        if(this.props.location.state) {
            this.setState({spotList: pinList});

            let L = window.L;
            let map = L.map('mapid').setView([45.9443, 25.0094], 2);

            this.setState({L: L});
            this.setState({map: map});

            this.state.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.state.map);

            for(let i = 0; i < pinList.length; i++) {
                this.addPinPoint(pinList[i]);
                this.insertSpotInTable(pinList[i]);
            }

            for(let i = 0; i < pinList.length; i++) {
                for(let j = 0; j < this.state.favorites.length; j++) {
                    if(pinList[i].id === this.state.favorites[j].id) {
                        // this.switchFavorite(this.state.markers[i], pinList[i], "Add"+pinList[i].id);
                    }
                }
            }
        }
    }

    addSpot() {
        let newData = {
            "id": (parseInt(this.state.spotList[this.state.spotList.length - 1].id) + 1).toString(),
            "name": document.getElementById("name").value,
            "country": document.getElementById("country").value,
            "lat": document.getElementById("latitude").value,
            "long": document.getElementById("longitude").value,
            "month": document.getElementById("month").value,
            "probability": document.getElementById("probability").value,
        }

        if(!document.getElementById("name").value || 
            !document.getElementById("country").value ||
            !document.getElementById("latitude").value ||
            !document.getElementById("longitude").value ||
            !document.getElementById("month").value ||
            !document.getElementById("probability").value) {
            alert("Completarea tuturor campurilor e necesara");
        } else {
            postNewSpot(newData);

            let newList = this.state.spotList;
            newList.push(newData);
            this.setState({spotList: newList});

            this.addPinPoint(newData);
            this.insertSpotInTable(newData);
        }
    }

    addPinPoint(data) {
        let marker = this.state.L.marker([data.lat, data.long])
            .addTo(this.state.map)
            .bindPopup(`<div class="popup"> \
                            <h6 class="location">${data.name}</h6>  \
                            <p id="countryName">${data.country}</p>  \
                            <div> \
                                <h6 class="information">Wind probability</h6> \
                                <p>${data.probability}% </p> \
                            </div> \
                            <div> \
                                <h6 class="information">Latitudine</h6> \
                                <p>${data.lat}&#176 N</p> \
                            </div> \
                            <div> \
                                <h6 class="information">Longitudine</h6> \
                                <p>${data.long}&#176 W</p> \
                            </div> \
                            <div> \
                                <h6 class="information">When to go</h6> \
                                <p>${data.month}</p> \
                            </div> \
                            <button onClick={{this.addFavorite}} class="popupBtn favoriteAdd" id="Add${data.id}">ADD TO FAVORITES</button> \
                            <button onClick={{this.deleteSpot}} class="popupBtn deleteSpot" id="${data.id}">DELETE SPOT</button> \
                        </div>`)
            .openPopup();

        let starIcon = this.state.L.icon({
            iconUrl: Star,
            iconSize: [38, 38]
        });

        let i, j;
        for(i = 0; i < this.state.spotList.length; i++) {
            for(j = 0; j < this.state.favorites.length; j++) {
                if(this.state.favorites[j].id === data.id) {
                    marker.setIcon(starIcon);
                }
            }
        }

        let button = this.state.L.DomUtil.get("Add"+data.id);
        this.state.L.DomEvent.addListener(button, 'click', () => this.switchFavorite(marker, data, "Add"+data.id));

        button = this.state.L.DomUtil.get(data.id);
        this.state.L.DomEvent.addListener(button, 'click', () => this.deleteSpot(marker, data));

        this.state.markers.push(marker);
    }

    showFavoriteSpots(favoritesList) {
        this.setState({favorites: favoritesList});
    }

    switchFavorite(marker, data, id) {
        if(document.getElementById(id).innerHTML.localeCompare("ADD TO FAVORITES") === 0) {
            document.getElementById(id).style.backgroundColor = 'rgb(' + [233,61,61].join(',') + ')';
            document.getElementById(id).innerHTML = "REMOVE FROM FAVORITES";

            let Fav = {
                "id": data.id,
                "createdAt": data.createdAt
            }
            this.state.favorites.push(Fav);

            let starIcon = this.state.L.icon({
                iconUrl: Star,
                iconSize: [38, 38]
            });
            marker.setIcon(starIcon);

            postFavoriteSpot(Fav);
        } else {
            document.getElementById(id).style.backgroundColor = 'rgb(' + [233,200,48].join(',') + ')';
            document.getElementById(id).innerHTML = "ADD TO FAVORITES";

            let newFavoritesList = this.state.favorites.filter(m => m.id !== data.id);
            this.setState({favorites: newFavoritesList});

            let Icon = this.state.L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                iconSize: [38, 38]
            });

            marker.setIcon(Icon);
            deleteFavoriteSpot(data.id);
        }
    }

    deleteSpot(marker, data) {
        this.state.map.removeLayer(marker);

        let newspotList = this.state.favorites.filter(m => m.id !== data.id);
        this.setState({spotList: newspotList});

        let newMarkerList = this.state.markers.filter(m => m !== marker);
        this.setState({markers: newMarkerList});

        let rows = document.getElementById("spotsTable").rows;
        let i, j, td, check, txtValue;
        for(i = 1; i < 2; i++) {
            check = 0;
            td = rows[i].getElementsByTagName("TD");

            for(j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;

                if(j === 0 && txtValue === data.name) {
                    check++;
                }
                if(j === 1 && txtValue === data.country) {
                    check++;
                }
                if(j === 2 && txtValue === data.lat) {
                    check++;
                }
                if(j === 3 && txtValue === data.long) {
                    check++;
                }
                if(j === 4 && txtValue === data.probability) {
                    check++;
                }
                if(j === 5 && txtValue === data.month) {
                    check++;
                }
            }

            if(check === 6) {
                document.getElementById("spotsTable").deleteRow(i);
            }
        }
        
        deleteSpotRequest(data.id);
    }

    insertSpotInTable(elem) {
        
        let table = document.getElementById("spotsTable");
        let row, cell0, cell1, cell2, cell3, cell4, cell5;

        row = table.insertRow(1);
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);

        cell0.innerHTML = elem.name;
        cell1.innerHTML = elem.country;
        cell2.innerHTML = elem.lat;
        cell3.innerHTML = elem.long;
        cell4.innerHTML = elem.probability;
        cell5.innerHTML = elem.month;
    }

    sortTable(n) {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("spotsTable");

        if(table) {
            switching = true;
            dir = "asc"; 

            while (switching) {
                switching = false;
                rows = table.rows;

                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];

                    if (dir === "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch= true;
                            break;
                        }
                    } else if (dir === "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount ++;      
                } else {
                    if (switchcount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }
    }

    search() {
        let input, filter, table, tr, td, i, txtValue, j, check = 0;

        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("spotsTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            check = 0;

            for(j = 0; j < td.length; j++) {
                txtValue = td[j].textContent || td[j].innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    check = 1;
                } 
            }

            if(check) {
                for(j = 0; j < td.length; j++) {
                    td[j].style.display = "";
                }
            } else {
                for(j = 0; j < td.length; j++) {
                    td[j].style.display = "none";
                }
            }
        }
    }

    applyFilter() {
        let i;
        let country = document.getElementById("countryFilter").value;
        let wind = document.getElementById("windProbFilter").value;

        for(i = 0; i < this.state.spotList.length; i++) {
            if(country && this.state.spotList[i].country.toUpperCase() !== country.toUpperCase()) {
               this.state.map.removeLayer(this.state.markers[i]);
            }

            if(wind && this.state.spotList[i].probability !== wind) {
                this.state.map.removeLayer(this.state.markers[i]);
            }
        }

        this.showBtn();
    }

    hideBtn() {
        document.getElementById("filterButton").style.display = "none";
    }

    showBtn() {
        document.getElementById("filterButton").style.display = "";
    }

    setUserInfo(data) {
        this.setState({userInfo: data});

        document.getElementById("userId").innerHTML = data.id;
        document.getElementById("userName").innerHTML = data.name;
        document.getElementById("userEmail").innerHTML = data.email;
    }

    render() {
        if(!this.props.location.state && !this.state.userInfo) {
            return <Redirect to={{pathname: "/login"}}/>
        }

        return(
            <>
                <Navbar userId={this.state.id} setUserInfo={this.setUserInfo}/>
                <div id="mapWrapper">
                    <div id="mapid"></div>
                    <div id="buttonWrapper">
                        <button id="filterButton" onClick={this.hideBtn} type="button" data-toggle="modal" data-target="#myModalFilter">
                            <span>
                                <ion-icon name="filter-outline"></ion-icon>
                            </span>
                            Filters 
                        </button>
                    </div>
                    
                    <div className="modal fade" id="myModalFilter" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button onClick={this.showBtn} type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form className="formFields">
                                        <label className="filterLabel">Country</label>
                                        <input className="filterInput" 
                                                type="text" 
                                                id="countryFilter" 
                                                name="country"
                                                placeholder="Country..."></input>

                                        <label className="filterLabel">Wind probability</label>
                                        <input className="filterInput" 
                                                type="text" 
                                                id="windProbFilter" 
                                                name="windProbFilter"
                                                placeholder="Wind probability..."></input>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.applyFilter} type="button" className="btn btn-default apply" data-dismiss="modal">Apply filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="myModalInfo" role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <label className="dataLabel">Id</label>
                                <p className="dataInput" id="userId"></p>

                                <label className="dataLabel">Name</label>
                                <p className="dataInput" id="userName"></p>

                                <label className="dataLabel">Email</label>
                                <p className="dataInput" id="userEmail"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h4>Add Spot</h4>
                                <form className="formFields">
                                    <label className="dataLabel">Name</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="name" 
                                            name="name"
                                            placeholder="Name..."></input>

                                    <label className="dataLabel">Country</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="country" 
                                            name="country"
                                            placeholder="Country..."></input>

                                    <label className="dataLabel">Longitude</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="longitude" 
                                            name="longitude"
                                            placeholder="Longitude..."></input>

                                    <label className="dataLabel">Latitude</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="latitude" 
                                            name="latitude" 
                                            placeholder="Latitude..."></input>
                                    
                                    <label className="dataLabel">When to go</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="month" 
                                            name="month" 
                                            placeholder="Month..."></input>

                                    <label className="dataLabel">Probability</label>
                                    <input className="dataInput" 
                                            type="text" 
                                            id="probability" 
                                            name="probability" 
                                            placeholder="Probability..."></input>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default cancel" data-dismiss="modal">Cancel</button>
                                <button onClick={this.addSpot} type="button" className="btn btn-default confirm" data-dismiss="modal">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="input-group rounded" id="searchContainer">
                    <label id="searchLabel">Locations</label> 
                    <input id="searchInput" onKeyUp={this.search} type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <ion-icon name="search-outline"></ion-icon>
                    </span>
                </div>
                <div id="tableDiv">
                    <table id="spotsTable">
                        <tr>
                            <th onClick={() => this.sortTable(0)}>Name</th>
                            <th onClick={() => this.sortTable(1)}>Country</th>
                            <th onClick={() => this.sortTable(2)}>Latitude</th>
                            <th onClick={() => this.sortTable(3)}>Longitude</th>
                            <th onClick={() => this.sortTable(4)}>Wind Prob.</th>
                            <th onClick={() => this.sortTable(5)}>When to go</th>
                        </tr>
                        
                    </table>
                </div>
            </>
        );
    };
}

export default Kite;
