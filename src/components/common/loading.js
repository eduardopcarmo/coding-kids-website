// React
import React, { Component } from 'react';

// CSS
import './loading.css';

class Loading extends Component{
    render(){
        return (
            <div className="loading">
                <span className="loading__dot"></span>
                <span className="loading__dot"></span>
                <span className="loading__dot"></span>
            </div>
        );
    }
}

export default Loading;