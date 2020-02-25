// React
import React, { Component } from 'react';

class Button extends Component{
    render(){
        return (
            <button type="button" className={this.props.classList} onClick={() => this.props.action()} data-key={this.props.dataKey}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;