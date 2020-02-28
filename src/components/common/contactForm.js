// React
import React, { Component } from 'react';

// Custom Components
import Button from './button';

// Image
import heroImage from '../../assets/img/codingkids_logo.png'; // with import

// CSS
import './contactForm.css';

class ContactForm extends Component{
    saveForm(){
        alert('saveForm');
    }

    render(){
        return (
            <section className="contactForm">
                <h1>Book a trial class</h1>
                <img src={heroImage} alt="Coding Kids" />
                <form className="form__horizontal">
                    <div className="form__horizontal_line">
                        <label>Day of the class</label>
                        <select>
                            <option value="1">Day 1</option>
                            <option value="2">Day 2</option>
                            <option value="3">Day 3</option>
                            <option value="4">Day 4</option>
                        </select>
                    </div>
                    <div className="form__horizontal_line">
                        <label>E-mail</label>
                        <input type="text"/>
                    </div>
                    <div className="form__horizontal_line">
                        <label>Parent's / Caregiver's Name </label>
                        <input type="text"/>
                    </div>
                    <div className="form__horizontal_line">
                        <label>Parent's / Caregiver's Phone Number</label>
                        <input type="text"/>
                    </div>
                    <div className="form__horizontal_line">
                        <label>Child's (Children's) Name</label>
                        <input type="text"/>
                    </div>
                    <div className="form__horizontal_line">
                        <label>Child's (Children's) Age / Grade</label>
                        <input type="text"/>
                    </div>
                    <div className="form__horizontal_line">
                        <Button 
                            classList="primary" 
                            action={(e) => this.saveForm()}
                            dataKey={Date.now()}
                            text="Apply" />
                    </div>
                </form>
            </section>
        )
    }
}

export default ContactForm;