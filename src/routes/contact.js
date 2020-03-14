import React, { Component } from 'react';

// Custom Components
import ContactPage from '../components/pages/contact';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Contact extends Component{
    render(){
        return (
            <section id="contact">
                <ScrollToTopNavigation />
                <ContactPage />
            </section>
        );
    }
}

export default Contact;