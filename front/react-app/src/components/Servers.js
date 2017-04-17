import React, { Component } from 'react';

class Servers extends Component {
    render() {
        const stateServers = this.props.state.Servers
        let servers = []

        const generateMap = (key) => {
            const grass_main = "./assets/images/grass_main.png"

            const tiles1 = []
            for (let x=0, largeur=20; x<largeur; x++ ){
                for (let y=0, hauteur=20; y<hauteur; y++ ){
                    tiles1.push({
                        position: {
                            x: x*key,
                            y: y*key,
                        },
                        line: x*key,
                        column: y*key,
                        tileset: {
                            url: grass_main
                        }
                    })
                }
            }

            const tiles2 = []
            for (let x=0, largeur=20; x<largeur; x++ ){
                for (let y=0, hauteur=20; y<hauteur; y++ ){
                    tiles2.push({
                        position: {
                            x: x*key,
                            y: y*key,
                        },
                        line: (x-1)*key,
                        column: y*key,
                        tileset: {
                            url: grass_main
                        }
                    })
                }
            }

            const map = [{
                type: "design",
                tiles: tiles1
            }, {
                type: "design",
                tiles: tiles2
            }]

            return map
        }

        // set servers dom
        for (let i=0, size=stateServers.servers.length; i<size; i++) {
            let server = stateServers.servers[i]

            servers.push(
                <p className={ `server` } key={ i } onClick={this.props.loadMap(generateMap(i))}>
                    <span className="id">{ server.id }</span>. <span className="name">{ server.name }</span>
                </p>
            )
        }

        return (
            <div className="Servers">
                <div className="list">
                    { servers }
                </div>
                <div className="play" ><p>GO !</p></div>
            </div>
        );
    }
}

export default Servers;
