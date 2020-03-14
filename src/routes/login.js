import React, { Component } from 'react';

// Custom Components
import LoginPage from '../components/pages/login' ;
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Curriculum extends Component{
    render(){
        return (
            <section id="login">
                <ScrollToTopNavigation />
                <LoginPage />
            </section>
        );
    }
}

export default Curriculum;