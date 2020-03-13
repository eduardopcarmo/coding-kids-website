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
            isOpen: null,
            active: 1
        };
    }

    // Toggle the Menu
    toggleMenu(id){
        let { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen,
            active: id
        });
    }

    renderLink(to, text, id){
        return(
            <li className="nav__list-item"><Link to={to} className={this.state.active === id ? "nav__link nav__link-active" : "nav__link" } onClick={() => this.toggleMenu(id)}>{text}</Link></li>
        )
    }

    render(){
        return (
            <header className="header">
                <div className="header__container content__session">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="Coding Kids" />
                    </Link>
                    <nav className={this.state.isOpen ? "nav nav-open" : "nav"}>
                        <ul className="nav__list">
                            {this.renderLink("/", "Home", 1)}
                            {this.renderLink("/curriculum", "Curriculum", 2)}
                            {this.renderLink("/faq", "FAQ", 3)}
                            {this.renderLink("/blog", "Blog", 4)}
                            {this.renderLink("/contact", "Contacts", 5)}
                        </ul>
                    </nav>
                    <button className="header__toggle" onClick={() => this.toggleMenu(this.state.active)}>≡</button>
                </div>
            </header>
        );
    }
}

export default Header;