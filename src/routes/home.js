// React
import React, { Component } from 'react';

// Custom Components
import HomePage from '../components/home';

class Home extends Component{
    render(){
        return (
            <section id="home">
                <HomePage />
            </section>
        );
    }
}

export default Home;