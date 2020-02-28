// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component{
    render(){
        return (
            <footer className="footer default_space">
                <div className="section_3_columns">
                    <div>
                        <p>Coding Kids</p>
                        <p>8188 Lord Street,</p>
                        <p>Vancouver, BC</p>
                        <p>phone:</p>
                        <p>email:</p>
                    </div>
                    <div>
                        <p>(C) Alexander Vasilyev</p>
                        <p>(C) Eduardo Pereira do Carmo</p>
                    </div>
                    <div>
                        <p><Link to="/Dashboard" className="footer__link">Login</Link></p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;