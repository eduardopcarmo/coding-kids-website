// React
import React, { Component } from 'react';

// Custom Components
import HomePage from '../components/pages/home';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Home extends Component{
    render(){
        return (
            <section id="home">
                <ScrollToTopNavigation />
                <HomePage />
            </section>
        );
    }
}

export default Home;