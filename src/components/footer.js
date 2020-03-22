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
                    <p>
                        <a href="https://github.com/oh-my-code" rel="noopener noreferrer" target="_blank">(C) Alexander Vasilyev</a>
                        &nbsp;/&nbsp;
                        <a href="https://github.com/eduardopcarmo" rel="noopener noreferrer" target="_blank">(C) Eduardo Pereira do Carmo</a>
                    </p>
                    <p>
                        <Link to="/Dashboard" className="footer__link">Login</Link>
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;