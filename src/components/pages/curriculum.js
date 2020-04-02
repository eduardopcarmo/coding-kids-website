// React
import React, { Component } from 'react';

// Custom Components
import Button from '../common/button';
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// Image
import curriculumImage from '../../assets/img/curriculum/curriculum.jpg';


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

    // Scroll to show Contact Form
    scrollToContact(){
        window.scrollTo(0, document.getElementsByTagName("footer")[0].offsetTop);
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
                <div className="content__session-col content__schedule">
                    {
                        items.map(function(session, index){
                            let sessionName = session.name.split(', ');
                            return (
                                <div className="content__schedule-box" key={index}>
                                    <h2>{sessionName[0]}</h2>
                                    <p>{sessionName[1]}</p>
                                    <Button 
                                        classList="btn btn-secondary"
                                        action={(e) => this.scrollToContact()}
                                        dataKey={Date.now}
                                        text="Book a trial session"/>
                                </div>
                            ) 
                        }, this)
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
                <div className="content__session-col content__instructors">
                    {
                        items.map(function(instructor, index){
                            return (
                                <div className="content__instructors-box" key={index}>
                                    <img src={instructor.photoUrl} className="border-img-round" alt={instructor.firstName} />
                                    <div className="content__instructors-box__content">
                                        <h2>{instructor.firstName}</h2>
                                        <p>{instructor.bio}</p>
                                    </div>
                                </div>
                            ) 
                        }, this)
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
                <section className="content__session curriculum__grades">
                    <h1 className="content__session-title content__session-title-big">Curriculum</h1>
                    <div className="content__session-col content__grades">
                        <img src={curriculumImage} className="border-img" alt="Curriculum" />
                        <div className="content__grades-box">
                            <div className="box">
                                <h2 className="box__title box__title-small">Virtual Reality (VR)</h2>
                                <p className="box__text">Unique and exciting technology of virtual reality developed by Canadian company C3D engages and motivates children to explore and grasp coding knowledge.</p>
                            </div>
                            <div className="box">
                                <h2 className="box__title box__title-small">Gamification</h2>
                                <p className="box__text">Children's favourite characters like MineCraft help them to start loving coding from an early age.</p>
                            </div>
                            <div className="box">
                                <h2 className="box__title box__title-small">Computer Skills</h2>
                                <p className="box__text">Keyboarding - Typing practice will help your child feel confident with computers and make coding learning easier and more fun. How computer and Internet works.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content__session curriculum__schedule">
                    <h1 className="content__session-title content__session-title-big">Schedule</h1>
                    {this.renderSchedule()}
                </section>
                <section className="content__session curriculum__instructors">
                    <h1 className="content__session-title content__session-title-big">Instructors</h1>
                    {this.renderInstructors()}
                </section>
            </div>
        );
    }
}

export default Curriculum;