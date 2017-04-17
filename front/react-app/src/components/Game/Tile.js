import React, { Component } from 'react';

class Tile extends Component {
    constructor(props){
        super(props)

        this.state = {
            tileset: {
                url: props.tileset.url
            },
            position: props.position,
            column: props.column,
            line: props.line,
            key: props.key,
            active: props.active
        }
    }
    componentWillReceiveProps(nextProps){
        this.state = {
            tileset: {
                url: nextProps.tileset.url
            },
            position: nextProps.position,
            column: nextProps.column,
            line: nextProps.line,
            key: nextProps.key,
            active: nextProps.active
        }
    }
    render() {
        const style = {
            background: `url(${this.state.tileset.url})`,
            backgroundPositionX: `-${this.state.column * 64}px`,
            backgroundPositionY: `-${this.state.line * 64}px`,
            left: `${this.state.position.x * 64}px`,
            top: `${this.state.position.y * 64}px`
        }

        return (
            <div className="Tile" style={style} key={this.state.key}  >
                <span>
                    Tile n°{this.state.key}
                </span>
            </div>
        );
    }
}

export default Tile;
