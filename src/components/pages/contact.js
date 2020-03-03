// React
import React, { Component } from 'react';

// Custom Components
import PageTitle from '../common/pageTitle';
import ContactForm from '../common/contactForm';

// Image
import contactInfoImg from '../../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';

// CSS
import './contact.css';

class Faq extends Component{
    // Render the Page
    render(){
        return (
            <div className="contact">
                <PageTitle title="Contacts" />
                <section className="contact_info default_space">
                    <h1>Contact info</h1>
                    <p>Phone: 6127316287631872</p>
                    <p>Email: 1y27367a@mail.com</p>
                    <img src={contactInfoImg} alt="Contact Info" />
                </section>
                <section className="contact_map default_space">
                    <h1>Location</h1>
                    <p>ahsdufhasdufhuasd</p>
                    <img src={contactInfoImg} alt="Contact Info" />
                </section>
                <ContactForm />
            </div>
        );
    }
}


export default Faq;