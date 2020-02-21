// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Logo
import logo from '../../assets/img/codingkids_logo.png'; // with import

// CSS
import './header.css';

// Header
class Header extends Component{
    render(){
        return (
            <header>
                <nav className="header">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="Coding Kids" />
                    </Link>
                    <ul className="header__list">
                        <li className="header__item"><Link to="/" className="header__link">Home</Link></li>
                        <li className="header__item"><Link to="/curriculum" className="header__link">Curriculum</Link></li>
                        <li className="header__item"><Link to="/faq" className="header__link">FAQ</Link></li>
                        <li className="header__item"><Link to="/blog" className="header__link">Blog</Link></li>
                        <li className="header__item"><Link to="/contact" className="header__link">Contacts</Link></li>                    
                    </ul>
                    <button className="header__toggle">
                        <span className="hamburger">≡</span>
                    </button>
                </nav>
            </header>
        );
    }
}

export default Header;