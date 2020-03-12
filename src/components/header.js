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
            <li className="nav__list-item"><Link to={to} className="nav__link" onClick={() => this.toggleMenu()}>{text}</Link></li>
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
                            {this.renderLink("/", "Home")}
                            {this.renderLink("/curriculum", "Curriculum")}
                            {this.renderLink("/faq", "FAQ")}
                            {this.renderLink("/blog", "Blog")}
                            {this.renderLink("/contact", "Contacts")}
                        </ul>
                    </nav>
                    <button className="header__toggle" onClick={() => this.toggleMenu()}>≡</button>
                </div>
            </header>
        );
    }
}

export default Header;