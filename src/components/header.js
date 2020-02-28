// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Logo
import logo from '../assets/img/codingkids_logo.png'; // with import

// Header
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: null
        };
    }

    // Toggle the Menu
    toggleMenu(){
        let { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen,
        });
    }

    renderLink(to, text){
        return(
            <li className="header__item"><Link to={to} className="header__link" onClick={() => this.toggleMenu()}>{text}</Link></li>
        )
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
                    <ul className={this.state.isOpen === null ? 'header__list' : this.state.isOpen ? 'header__list header__list__open' : 'header__list header__list__close'}>
                        {this.renderLink("/", "Home")}
                        {this.renderLink("/curriculum", "Curriculum")}
                        {this.renderLink("/faq", "FAQ")}
                        {this.renderLink("/blog", "Blog")}
                        {this.renderLink("/contact", "Contacts")}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;