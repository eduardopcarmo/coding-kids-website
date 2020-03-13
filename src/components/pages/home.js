// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Custom Components
import Button from '../common/button';

// Image
import heroImage from '../../assets/img/home/hero.jpg';
import howWeTeachImage from '../../assets/img/home/how-we-teach.jpg';

// CSS
import './home.css';

class Home extends Component{

    scrollToContact(){
        window.scrollTo(0, document.getElementsByTagName("footer")[0].offsetTop);
    }

    render(){
        return (
            <div className="home">
                <section className="content__session home__hero">
                    <div className="content__session-col content__hero">
                        <img src={heroImage} className="border-img" alt="Incredible coding learning with exclusive VR experience" />
                        <div className="box">
                            <h1 className="box__title">Incredible coding learning with exclusive VR experience</h1>
                            <p className="box__text">Two hours of coding and creative activities for kids in grade 1 and up. Exclusive learning experience with Virtual Reality technology developed in Vancouver, BC.</p>
                            <Button 
                                classList="btn btn-secondary"
                                action={(e) => this.scrollToContact()}
                                dataKey={Date.now}
                                text="Book a trial session"/>
                        </div>
                    </div>
                    
                </section>
                <section className="content__division">
                    <p className="content__session">Coding Kids helps parents arrange developing and recreational after school experience.</p>
                </section>
                <section className="content__session home__whyLearnCoding">
                    <h2 className="content__session-title">Why learn coding</h2>
                    <div className="content__session-col">
                        <div className="box">
                            <h3 className="box__title">Computational Thinking</h3>
                            <p className="box__text">Learning coding will help your child develop problem solving and computational thinking skills that allows kids to grasp concepts like algorithms, recursion and heuristics — even if they don’t understand the terms, they’ll learn the basic concepts.</p>
                        </div>
                        <div className="box">
                            <h3 className="box__title">Part of Curriculum</h3>
                            <p className="box__text">Coding is a part of the K-12 curriculum in BC.</p>
                            <p className="box__text">It's becoming a mandatory in many countries, states and provinces. Coding helps children with Math skills and improves writing academic performance.</p>
                        </div>
                        <div className="box">
                            <h3 className="box__title">Professional Success</h3>
                            <p className="box__text">It's a great career path. The IT industry is in constant need of new workers, and it’s not only coders or computer science majors — it needs graphic designers, software developers, and many more.</p>
                            <p className="box__text">It's a well-paid job. For instance, a software engineer in British Columbia can make earn up to $69/hour. (Source: Job Bank Canada)</p>
                        </div>
                        <div className="box">
                            <h3 className="box__title">Fun for kids and their parents</h3>
                            <p className="box__text">At Coding Kids we teach in a fun, recreational way so kids can enjoy 2 hours of their after school time. It's crutial that coding is taught in a right way so kids don't get turned away.</p>
                            <p className="box__text">Bring your child to Marpole Oakridge Family Place and enjoy shopping and restaurants of Marine Gateway.</p>
                        </div>
                    </div>
                </section>
                <section className="content__session home__wowWeTeach">
                    <h2 className="content__session-title">How we teach</h2>
                    <div className="content__session-col content__hero">
                        <img src={howWeTeachImage} className="border-img" alt="Virtual Reality and Gamification" />
                        <div className="box">
                            <h1 className="box__title">
                                Virtual Reality
                                <br />
                                Gamification
                            </h1>
                            <p className="box__text">It's a great career path. The IT industry is in constant need of new workers, and it’s not only coders or computer science majors — it needs graphic designers, software developers, and many more.</p>
                            <p className="box__text">It's a well-paid job. For instance, a software engineer in British Columbia can make earn up to $69/hour. (Source: Job Bank Canada)</p>
                            <Link to="/curriculum" className="btn btn-primary">Find out more</Link>
                         </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;