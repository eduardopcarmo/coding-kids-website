import React, { Component } from 'react';

// Custom Components
import DashboardPage from '../components/pages/dashboard';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Faq extends Component{
    render(){
        return (
            <section id="dashboard">
                <ScrollToTopNavigation />
                <DashboardPage />
            </section>
        );
    }
}

export default Faq;