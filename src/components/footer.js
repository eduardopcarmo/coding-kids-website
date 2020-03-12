// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Custom Components
import ContactForm from '../components/common/contactForm';

class Footer extends Component{
    render(){
        return (
            <footer className="footer">
                <ContactForm />
                <div className="footer_links">
                    <a href="https://github.com/oh-my-code" rel="noopener noreferrer" target="_blank">(C) Alexander Vasilyev</a>
                    <a href="https://github.com/eduardopcarmo" rel="noopener noreferrer" target="_blank">(C) Eduardo Pereira do Carmo</a>
                    <Link to="/Dashboard" className="footer__link">Login</Link>
                </div>
            </footer>
        );
    }
}

export default Footer;