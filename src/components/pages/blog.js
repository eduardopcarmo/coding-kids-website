// React
import React, { Component } from 'react';

// Google Charts
//import { Chart } from "react-google-charts";

// Custom Components
import PageTitle from '../common/pageTitle';
import ContactForm from '../common/contactForm';
import Box from '../common/box';
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';
import WagesByProvince from '../common/wagesByProvince';

// JSON FILE
import blogPosts from '../../assets/json/blog.json';

// CSS
import './blog.css';

class Blog extends Component{
    constructor(props){
        super(props);
        this.state = {
            futureSkills: {
                errors: null,
                isLoaded: false,
                data: []
            }
        };
    }

    // Load Future Skills Info
    loadFutureSkills(){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/futureSkill', {
            method: 'get',
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(response => {
            if(response.status !== 200){
                this.setState({
                    futureSkills: {
                        isLoaded: true,
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
                        futureSkills: {
                            isLoaded: true,
                            data: result.data,
                        }
                    });
            }else {
                this.setState({
                    futureSkills: {
                        isLoaded: true,
                        errors: result.status.errors
                    }
                });
            }
        }).catch(error => {
            this.setState({
                futureSkills: {
                    isLoaded: true,
                    errors: [ error ]
                }
            });
        });
    }


    // Load data from API
    componentDidMount(){
        this.loadFutureSkills();
    }

    renderFutureSkillsGraphic(year){
        const {isLoaded, errors, data} = this.state.futureSkills;

        // Is Loading that from API
        if(!isLoaded){
            return <Loading />
        }else if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }else if(Array.isArray(data[year]) && data[year].length > 0){
            // Show the Sessions
            return (
                <div className="blog__future_skills__content_graphic">
                    {
                        data[year].map(function(skill, index){
                            return (
                                <p key={index}>{index + 1} - {skill}</p>
                            ) 
                        })
                    }
                </div>
            )
        }else{
            return ("");
        }
    }

    // render Future Skills
    renderFutureSkills() {
        return(
            <section className="blog__future_skills default_space">
                <h2>Top 10 skills by year</h2>
                <div className="blog__future_skills__content">
                    <div className="blog__future_skills__content__before">
                        <h3>BEFORE <small>2015</small></h3>
                        {this.renderFutureSkillsGraphic(2015)}
                    </div>
                    <div className="blog__future_skills__content__today">
                        <h3>TODAY <small>2020</small></h3>
                        {this.renderFutureSkillsGraphic(2020)}
                    </div>
                    
                </div>
            </section>
        )
    }

    // Render all blog posts
    renderBlogPosts(){
        return (
            <div className="section_1_columns">
                {
                    blogPosts.articles.map(function(article, index){
                        return (
                            <div key={Date.now().toString() + index}>
                                <Box 
                                    title={article.title}
                                    text={article.text}/>
                            </div>
                        ) 
                    })
                }
            </div>
        )
    }
    
    // Render the Page
    render(){
        return (
            <div className="blog">
                <PageTitle title="Blog" />
                {this.renderFutureSkills()}
                <WagesByProvince />
                {this.renderBlogPosts()}
                <ContactForm />
            </div>
        );
    }
}


export default Blog;