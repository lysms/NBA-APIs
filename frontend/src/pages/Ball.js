import React from 'react';
import './Ball.css';

export default class Ball extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Basketball Statistics Application</h1>
                </div>
                {/* input the idea to display a player */}
                <div className="inputData">
                    <div className="text-white">
                        <label htmlFor="userid" className="id">Player ID:</label>
                        <input type="text" id="playerid" className="form-control" name="playerid" placeholder="237"></input>
                        <label htmlFor="userid" className="id">Player Name:</label>
                        <input type="text" id="playerName" className="form-control" name="PlayerName" placeholder="Lebron James"></input>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-4">
                                {/* To submit the information then fetch the data. */}
                                <div>
                                    <button className="btn btn-primary" onClick={() => { this.sendPlayerID(); }} type="submit">Find Player In ID</button>
                                </div>
                            </div>
                            <div className="col-4">
                                {/* To submit the information then fetch the data. */}
                                <div>
                                    <button className="btn btn-primary" onClick={() => { this.sendName(); }} type="submit">Find Player In Name</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="container"></div>
                </div>
            </div>
        )
    }

    async sendPlayerID() {
        var id = document.querySelector('#playerid').value;
        if (id === "") {
            alert("Please enter the id number");
            return;
        }
        console.log("The id you enter is " + id);
        fetch("http://localhost:3030/get-player", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let html = `<h3 class="show">Your Player Statistics for ID ${id}</h3>
                            <div class="showing text-white">
                                <h5><span>${data['first_name']} ${data['last_name']}</span></h5>
                                <p>His height is <span>${data['height_inches']}.${data['height_feet']}</span>, and his weight is <span>${data['weight_pounds']}</span> pounds.</p>
                                <p>Serve at Team <span>${data['team']['full_name']}</span>, the abbreviation for the team is
                                     <span>${data['team']['abbreviation']}</span> and his position is <span>${data['position']}</span>.</p>
                            </div>`;

                let container = document.querySelector('#container');
                container.innerHTML = html;
            });
    }

    async sendName() {
        let name = document.querySelector('#playerName').value;
        if (name === "") {
            alert("Please enter the player name you want to search.");
            return;
        }
        console.log("The name you enter is " + name);
        fetch("http://localhost:3030/get-playerName", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data['data'][0]);

                let html = `<h3 class="show">Your Player Statistics for ${name}</h3>
                            <div class="showing text-white">
                                <h5><span>${data['data'][0]['first_name']} ${data['data'][0]['last_name']}</span></h5>
                                <p>His height is <span>${data['data'][0]['height_inches']}.${data['data'][0]['height_feet']}</span>, and his weight is <span>${data['data'][0]['weight_pounds']}</span> pounds.</p>
                                <p>Serve at Team <span>${data['data'][0]['team']['full_name']}</span>, the abbreviation for the team is
                                     <span>${data['data'][0]['team']['abbreviation']}</span> and his position is <span>${data['data'][0]['position']}</span>.</p>
                            </div>`;

                let container = document.querySelector('#container');
                container.innerHTML = html;
            });
    }
}