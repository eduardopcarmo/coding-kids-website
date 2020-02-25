// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Logo
import logo from '../assets/img/codingkids_logo.png'; // with import

// CSS
import './header.css';

// Header
class Header extends Component{
    toggleMenu(){
        alert('oi')
    }

    render(){
        return (
            <header>
                <nav className="header">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="Coding Kids" />
                    </Link>
                    <button className="header__toggle">
                        <span className="hamburger" onClick={() => this.toggleMenu()}>≡</span>
                    </button>
                    <ul className="header__list">
                        <li className="header__item"><Link to="/" className="header__link">Home</Link></li>
                        <li className="header__item"><Link to="/curriculum" className="header__link">Curriculum</Link></li>
                        <li className="header__item"><Link to="/faq" className="header__link">FAQ</Link></li>
                        <li className="header__item"><Link to="/blog" className="header__link">Blog</Link></li>
                        <li className="header__item"><Link to="/contact" className="header__link">Contacts</Link></li>
                        <li className="header__item__close"><button className="header__item__close__button" onClick={() => this.toggleMenu()}>X</button></li>                    
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;