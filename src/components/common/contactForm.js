// React
import React, { Component } from 'react';

// Npm package
import InputMask from 'react-input-mask';

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// Image
import heroImage from '../../assets/img/contactForm/kid_using_vr.jpg'; // with import

// CSS
import './contactForm.css';

class ContactForm extends Component{

    constructor(props){
        super(props);

        // Form Default Value
        this.state = {
            dayOfTheClass: {
                errors: null,
                isLoaded: false,
                items: []
            }, 
            disableSubmitBtn: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Load data from API
    componentDidMount(){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/class', {
            method: 'get',
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(response => {
            if(response.status !== 200){
                this.setState({
                    dayOfTheClass: {
                        isLoaded: true
                    }
                });
                throw response.statusText;
            }else{
                return response.json();
            }
        })
        .then(result => {
            if(result != null 
                && result.status != null 
                && result.status.id === 200){
                    // Map result
                    let items = [];
                    if(Array.isArray(result.data) && result.data.length > 0){
                        for(let i = 0; i < result.data.length; i++){
                            let name = result.data[i].name;
                            if(Array.isArray(result.data[i].sessions) && result.data[i].sessions.length > 0){
                                for(let z = 0; z < result.data[i].sessions.length; z++){
                                    items.push({
                                        value: result.data[i].sessions[z].id,
                                        text: `${name} (${(new Date(result.data[i].sessions[z].start)).toLocaleDateString("en-US")})`
                                    });
                                }
                            }
                        }
                    }
                    // Set State
                    this.setState({
                        dayOfTheClass: {
                            isLoaded: true,
                            items: items
                        }
                    });
            }else {
                this.setState({
                    dayOfTheClass: {
                        isLoaded: true,
                        errors: result.status.errors
                    }
                });
            }
        }).catch(error => {
            this.setState({
                dayOfTheClass: {
                    isLoaded: true,
                    errors: [ error ]
                }
            });
        });
    }

    // Handle all Input Changing in the Form
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // Handle the form submition of the form
    handleSubmit(event) {
        // Prevent Default behavior
        event.preventDefault();

        // Get state values
        let {
                childAge, 
                childName, 
                dayOfTheClass, 
                email, 
                note, 
                parentName, 
                parentPhoneNumber, 
                session} = this.state;


        // Check values
        if(session === undefined){
            session = dayOfTheClass.items[0].value
        }

        // Disable the form
        this.setState({
            disableSubmitBtn: true
        });

        // Submit the to the API
        let valueToSubit = {
            "sessionId": session,
            "email": email,
            "parentName": parentName,
            "parentPhone": parentPhoneNumber,
            "childName": childName,
            "childAge": childAge,
            "note": note === null ? "" : note
        }

        // Submit data
        fetch('http://api.codingkids.wmdd.ca/booking/addNew', {
            method: 'post',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(valueToSubit)
        }).then(response => {
            if(response.status !== 200){
                this.setState({
                    disableSubmitBtn: false
                });
                throw response.statusText;
            }else{
                return response.json();
            }
        })
        .then(result => {
            if(result != null 
                && result.status != null 
                && result.status.id === 200){
                    alert('Submit success');
                    // Set State
                    this.setState({
                        childAge: null, 
                        childName: null, 
                        dayOfTheClass, 
                        email, 
                        note, 
                        parentName, 
                        parentPhoneNumber, 
                        session,
                        disableSubmitBtn: false
                    });
            }else {
                console.log(result.status.errors)
                alert('Submit fail');
                this.setState({
                    disableSubmitBtn: false
                });
            }
        }).catch(error => {
            console.log(error)
            alert('Submit fail');
            this.setState({
                disableSubmitBtn: false
            });
        });
    }

    // Select Day of the Class
    renderDayOfTheClass(){
        const {isLoaded, errors, items} = this.state.dayOfTheClass;
        const disableSubmitBtn = this.state.disableSubmitBtn;
        
        // Is Loading that from API
        if(!isLoaded){
            return <Loading />
        }else if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }else if(Array.isArray(items) && items.length > 0){
            // Show the Days of Classes
            return (
                <select name="session" onChange={this.handleInputChange} disabled={disableSubmitBtn} required>
                    {
                        items.map(function(session, index){
                            return (
                                <option value={session.value} key={index}>{session.text}</option>
                            ) 
                        })
                    }
                </select>
            )
        }else{
            return ("");
        }
    }

    // Render the Component
    render(){
        const disableSubmitBtn = this.state.disableSubmitBtn;
        return (
            <section className="content__session contactForm">
                <div className="contactForm__box">
                    <h1>Book a free class</h1>
                    <form className="form__horizontal" onSubmit={this.handleSubmit}>
                        <label>Day of the class</label>
                        {this.renderDayOfTheClass()}
                        <label>E-mail</label>
                        <input type="email" name="email" onChange={this.handleInputChange} disabled={disableSubmitBtn} required/>
                        <label>Parent's / Caregiver's Name </label>
                        <input type="text" name="parentName" onChange={this.handleInputChange} disabled={disableSubmitBtn} required/>
                        <label>Parent's / Caregiver's Phone Number</label>
                        <InputMask mask="(999) 999 9999" maskChar=" " name="parentPhoneNumber" onChange={this.handleInputChange} disabled={disableSubmitBtn} required />
                        <label>Child's (Children's) Name</label>
                        <input type="text" name="childName" onChange={this.handleInputChange} disabled={disableSubmitBtn} required/>
                        <label>Child's (Children's) Age / Grade</label>
                        <input type="number" size="6" min="4" max="12" name="childAge" onChange={this.handleInputChange} disabled={disableSubmitBtn} required/>
                        <label>Notes</label>
                        <textarea rows="4" name="note" onChange={this.handleInputChange} disabled={disableSubmitBtn} />
                        <button type="submit" className="btn btn-secondary" disabled={disableSubmitBtn}>Book</button>
                    </form>
                </div>
                <img src={heroImage} className="border-img" alt="Book a free class" />
            </section>
        )
    }
}

export default ContactForm;