import React, { Component } from 'react';

// Custom Components
import ContactPage from '../components/pages/contact';

class Contact extends Component{
    render(){
        return (
            <section id="contact">
                <ContactPage />
            </section>
        );
    }
}

export default Contact;