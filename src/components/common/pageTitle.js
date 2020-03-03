// React
import React, { Component } from 'react';

// CSS
import './pageTitle.css';

class PageTitle extends Component{
    render(){
        return (
            <div className="page__title  default_space">
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

export default PageTitle;