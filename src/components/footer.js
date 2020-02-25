// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// CSS
import './footer.css';

class Footer extends Component{
    render(){
        return (
            <footer className="footer">
                <Link to="/Dashboard" className="footer__link">Dashboard</Link>
            </footer>
        );
    }
}

export default Footer;