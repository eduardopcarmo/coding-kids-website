// React
import React, { Component } from 'react';

// Image
import mapImage from '../../assets/img/contact/mofp_map.jpg';
import outsideImage from '../../assets/img/contact/mofp_outside.jpg';

// CSS
import './contact.css';

class Contact extends Component{
    // Render the Page
    render(){
        return (
            <div className="contact">
                <section className="content__session contact__address">
                    <h1 className="content__session-title content__session-title-big">Contact</h1>
                    <div className="content__address">
                        <img src={outsideImage} className="border-img"  alt="Marpole Oakridge Family Place" />
                        <div className="content__address-info">
                            <p><strong>Phone:</strong> (236) 862-5020</p>
                            <p><strong>Email:</strong> info@rocketagency.net</p>
                        </div>
                    </div>
                </section>

                <section className="content__session contact__location">
                    <h1 className="content__session-title content__session-title-big">Location</h1>
                    <div className="content__address">
                        <img src={mapImage} className="border-img"  alt="Marpole Oakridge Family Place" />
                        <div className="content__location-info">
                            <h2>The sessions are available at <strong>Marpole Oakridge Family Place</strong> located near Marine Drive Canada Line.</h2>
                            <p><strong>8188 Lord Street, Vancouver, BC, V6P 0G8.</strong></p>
                            <p><small>Free undeground parking available for clients.</small></p>
                            <a 
                            className="btn btn-primary"
                            rel="noopener noreferrer" 
                            target="_blank"
                            href="https://www.google.com/maps/place/Marpole+Oakridge+Family+Place/@49.2103221,-123.1205315,17z/data=!3m1!4b1!4m5!3m4!1s0x410b7f5a1d158f9b:0xdf9f1c3346bd6533!8m2!3d49.2103186!4d-123.1183428">See on Google Map</a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


export default Contact;