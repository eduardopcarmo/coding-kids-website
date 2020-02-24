// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component{
    render(){
        return (
            <footer className="footer">
                <Link to="/login" className="footer__link">Login</Link>
            </footer>
        );
    }
}

export default Footer;