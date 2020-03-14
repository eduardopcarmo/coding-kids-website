import React, { Component } from 'react';

// Custom Components
import FaqPage from '../components/pages/faq';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Faq extends Component{
    render(){
        return (
            <section id="faq">
                <ScrollToTopNavigation />
                <FaqPage />
            </section>
        );
    }
}

export default Faq;