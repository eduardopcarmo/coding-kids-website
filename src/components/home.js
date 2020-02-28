// React
import React, { Component } from 'react';

// Custom Components
import Button from './common/button';
import ContactForm from '../components/common/contactForm'

// Image
import heroImage from '../assets/img/home/stem-t4l-l862hX_FET8-unsplash_min.jpg';
import whyLearCodingImage from '../assets/img/home/IMAGE 2020-02-25 19_18_40.jpg';
import howWeTeachImage from '../assets/img/home/insung-yoon-L9X8l1yMiv0-unsplash.jpg';

// CSS
import './home.css';

class Home extends Component{

    scrollToContact(){
        alert('scrollToContact');
    }

    render(){
        return (
            <div className="home">
                <div className="home__hero default_space">
                    <h1>Incredible coding learning with exclusive VR experience</h1>
                    <img src={heroImage} className="round-img" alt="Incredible coding learning with exclusive VR experience" />
                    <p>Book a free session today and join the program. </p>
                    <p>
                        <Button 
                        classList="primary" 
                        action={(e) => this.scrollToContact()}
                        dataKey={Date.now()}
                        text="Apply" />
                    </p>
                </div>
                <p className="home__subHero default_space">
                    Coding Kids helps parents arrange developing and recreational after school experience.
                </p>
                <section className="home__why_learn default_space">
                    <h2>Why learn coding</h2>
                    <div className="section_3_columns">
                        <div className="box">
                            <img src={whyLearCodingImage} className="round-img" alt="Why learn coding" />
                        </div>
                        <div className="box">
                            <h1 className="small">Computational Thinking</h1>
                            <p>Learning coding will help your child develop problem solving and computational thinking skills that allow kids to grasp concepts like algorithms, recursion and heuristics—even if they don’ t understand the terms, they’ll learn the basic concepts.</p>
                        </div>
                        <div className="box">
                            <h1 className="small">Part of Curriculum</h1>
                            <p>Coding is a part of the K-12 curriculum in BC. It's becoming a mandatory in many countries, states and provinces. Coding helps children with Math skills and improves writing academic performance.</p>
                        </div>
                        <div className="box">
                            <h1 className="small">Professional Success</h1>
                            <p>The IT industry is in constant need of new workers, and it’s not only coders or computer science majors — it needs graphic designers, software developers, computer engineers, and many more. It's a well-paid job. For instance, a software engineer in British Columbia can make earn up to $69/hour. (Source: Job Bank Canada)</p>
                        </div>
                        <div className="box">
                            <h1 className="small">Fun for kids and parents</h1>
                            <p>At Coding Kids we teach in a fun, recreational way so kids can enjoy 2 hours of their after school time. It's crutial that coding is taught in a right way so kids don't get turned away.</p>
                        </div>
                    </div>
                </section>
                <section className="home__how_we_teach default_space">
                    <h2>How we teach</h2>
                    <div className="section_3_columns">
                        <div className="box">
                            <img src={howWeTeachImage} className="round-img" alt="How we teach" />
                        </div>
                        <div className="box">
                            <h1 className="small">Virtual Reality</h1>
                            <p>Unique and exciting technology of virtual reality developed by Canadian company engages and motivates children to explore and grasp coding knowledge.</p>
                        </div>
                        <div className="box">
                            <h1 className="small">Gamification</h1>
                            <p>Children's favourite characters like MineCraft help them to start loving coding from an early age.</p>
                        </div>
                    </div>
                </section>
                <ContactForm />
            </div>
        );
    }
}

export default Home;