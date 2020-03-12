// React
import React, { Component } from 'react';

class Button extends Component{
    render(){
        return (
            <button type="button" className={this.props.classList} onClick={() => this.props.action()}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;