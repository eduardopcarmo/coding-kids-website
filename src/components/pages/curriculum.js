// React
import React, { Component } from 'react';

// Custom Components
import PageTitle from '../common/pageTitle';
import ContactForm from '../common/contactForm';
import Box from '../common/box';
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// Image
import grade47Img1 from '../../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';
import grade47Img2 from '../../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';
import grade812Img1 from '../../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';
import grade812Img2 from '../../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';

// CSS
import './curriculum.css';

class Curriculum extends Component{
    constructor(props){
        super(props);
        this.state = {
            sessions: {
                errors: null,
                isLoaded: false,
                items: []
            },
            instructors: {
                errors: null,
                isLoaded: false,
                items: []
            }
        };
    }

    // Load Sessions Info
    loadSessions(){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/class', {
            method: 'get',
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(response => {
            if(response.status !== 200){
                    this.setState({
                        sessions: {
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
                    this.setState({
                        sessions: {
                            isLoaded: true,
                            items: result.data
                        }
                    });
            }else {
                this.setState({
                    sessions: {
                        isLoaded: true,
                        errors: result.status.errors
                    }
                });
            }
        }).catch(error => {
            this.setState({
                sessions: {
                    isLoaded: true,
                    errors: [ error ]
                }
            });
        });
    }

    // Load Instructors Info
    loadInstructors(){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/user/byType?typdId=2', {
            method: 'get',
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(response => {
            if(response.status !== 200){
                this.setState({
                    instructors: {
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
                    this.setState({
                        instructors: {
                            isLoaded: true,
                            items: result.data
                        }
                    });
            }else {
                this.setState({
                    instructors: {
                        isLoaded: true,
                        errors: result.status.errors
                    }
                });
            }
        }).catch(error => {
            this.setState({
                instructors: {
                    isLoaded: true,
                    errors: [ error ]
                }
            });
        });
    }

    // Load data from API
    componentDidMount(){
        this.loadSessions();
        this.loadInstructors();
    }

    // Render Schedule Information
    renderSchedule(){
        const {isLoaded, errors, items} = this.state.sessions;

        // Is Loading that from API
        if(!isLoaded){
            return <Loading />
        }else if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }else if(Array.isArray(items) && items.length > 0){
            // Show the Sessions
            return (
                <div className="section_2_columns">
                    {
                        items.map(function(session, index){
                            return (
                                <div className="curriculum__schedule_session" key={index}>
                                    {session.name}
                                </div>
                            ) 
                        })
                    }
                </div>
            )
        }else{
            return ("");
        }
    }

    // Render Instructors Information
    renderInstructors(){
        const {isLoaded, errors, items} = this.state.instructors;

        // Is Loading that from API
        if(!isLoaded){
            return <Loading />
        }else if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }else if(Array.isArray(items) && items.length > 0){
            // Show the Sessions
            return (
                <div className="section_2_columns">
                    {
                        items.map(function(instructor, index){
                            return (
                                <div className="curriculum__instructors_names" key={index}>
                                    <Box 
                                        img={instructor.photoUrl} 
                                        imgAlt={instructor.firstName + " " + instructor.lastName}
                                        title={instructor.firstName + " " + instructor.lastName}
                                        text={instructor.bio} 
                                        />
                                </div>
                            ) 
                        })
                    }
                </div>
            )
        }else{
            return ("");
        }
    }

    render(){
        return (
            <div className="curriculum">
                <PageTitle title="Curriculum" />
                <section className="curriculum__grades default_space">
                    <h2>Grade 4-7</h2>
                    <div className="section_2_columns">
                        <Box 
                            title="Header" 
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod arcu dictum nisl tincidunt euismod. Integer in urna urna. Proin egestas feugiat aliquam."
                            img={grade47Img1}
                            imgAlt="Header"
                            />
                        <Box 
                            title="Header" 
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod arcu dictum nisl tincidunt euismod. Integer in urna urna. Proin egestas feugiat aliquam."
                            img={grade47Img2}
                            imgAlt="Header"
                            />
                    </div>
                    <h2>Grade 8-12</h2>
                    <div className="section_2_columns">
                        <Box 
                            title="Header" 
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod arcu dictum nisl tincidunt euismod. Integer in urna urna. Proin egestas feugiat aliquam."
                            img={grade812Img1}
                            imgAlt="Header"
                            />
                        <Box 
                            title="Header" 
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod arcu dictum nisl tincidunt euismod. Integer in urna urna. Proin egestas feugiat aliquam."
                            img={grade812Img2}
                            imgAlt="Header"
                            />
                    </div>
                </section>
                <section className="curriculum__schedule default_space">
                    <h2>Schedule</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula justo a dui ultricies, sit amet molestie neque finibus. Aenean sed nulla tempus, elementum purus a, ultrices leo.</p>
                    {this.renderSchedule()}
                </section>
                <section className="curriculum__instructors default_space">
                    <h2>Instructors</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula justo a dui ultricies, sit amet molestie neque finibus. Aenean sed nulla tempus, elementum purus a, ultrices leo.</p>
                    {this.renderInstructors()}
                </section>
                <ContactForm />
            </div>
        );
    }
}

export default Curriculum;