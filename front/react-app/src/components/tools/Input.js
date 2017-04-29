import React, { Component } from 'react';

class Input extends Component {
    render() {
        return (
            <div className={ this.props.className } id={ this.props.id } >
                <div className="group">
                    <input type="text"
                           name={ this.props.name }
                           value={ this.props.value }
                           onChange={ this.props.onChange }
                           disabled={ this.props.disabled }
                           required />
                    <span className="bar" />
                    <label>{ this.props.label }</label>
                </div>
            </div>
        )
    }
}

export default Input;
