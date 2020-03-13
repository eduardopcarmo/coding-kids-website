// React
import React, { Component } from 'react';

// Custom Components
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
                <div className="blog__posts-skills-graphic">
                    {
                        data[year].map(function(skill, index){
                            return (
                                <div className="skill__line" key={index}>
                                    <div className={index % 3 ? "skill__position" : "skill__position skill__position-green" }>{index + 1}</div>
                                    <div className="skill__description">
                                        <h4 className="skill__description-title">{skill}</h4>
                                        <p className="skill__description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div className="skill__position skill__position-yellow">{data[2015].indexOf(skill) === -1 ? "-" : data[2015].indexOf(skill) + 1 }</div>
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

    // render Future Skills
    renderFutureSkills() {
        return(
            <div className="content__session blog__posts-skills">
                <h3 className="skill__title">
                    <span>2020</span>
                    <span>2015</span>
                </h3>
                {this.renderFutureSkillsGraphic(2020)}
            </div>
        )
    }

    // Render the Page
    render(){
        return (
            <div className="blog">
                <section className="content__session blog_title">
                    <h1 className="content__session-title content__session-title-big">Blog</h1>
                </section>
                <section className="blog__posts">
                    <article>
                        <h2>Top 10 skills in 2020</h2>
                        <p>It is no surprise that more than one-third of skills that are considered important in today’s workforce will change five years from now.</p>
                        <p>The World Economic Forum predicted current trends could lead to a net employment impact of more than 5.1 million jobs lost to disruptive labour market changes over the period 2015-2020, with a total loss of 7.1 million jobs.</p>
                        <p>Two thirds of jobs that could be lost are concentrated in routine white-collar office functions such as office and administrative roles. Meanwhile, there could be a total gain of two million jobs in computer and mathematical and architecture and engineering related fields.</p>
                        {this.renderFutureSkills()}
                        <aside>
                            <p>Source: World Economic Forum - 5 million jobs to be lost by 2020</p>
                            <p><a href="https://www.weforum.org/agenda/2016/01/5-million-jobs-to-be-lost-by-2020/" rel="noopener noreferrer" target="_blank">https://www.weforum.org/agenda/2016/01/5-million-jobs-to-be-lost-by-2020/</a></p>
                            <p><a href="https://www.humanresourcesonline.net/world-economic-forum-on-the-top-10-skills-and-workforce-strategies-in-2020/" rel="noopener noreferrer" target="_blank">https://www.humanresourcesonline.net/world-economic-forum-on-the-top-10-skills-and-workforce-strategies-in-2020/</a></p>
                        </aside>
                    </article>
                    <article>
                        <h2>Wages Canada</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non pellentesque odio. Suspendisse at rhoncus turpis, eu molestie turpis. Suspendisse sed nisi quis erat mattis rutrum eget cursus quam.</p>
                        <p>Mauris ac condimentum est. Vestibulum aliquet dictum odio, nec aliquam turpis laoreet sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce vestibulum volutpat augue, aliquam auctor risus tempus sit amet. Vivamus non turpis odio.</p>
                        <WagesByProvince />
                        <aside>
                            <p>Source: Government of Canada - Job Bank - Trend analysis, Compare wages</p>
                            <p><a href="https://www.jobbank.gc.ca/trend-analysis/search-wages" rel="noopener noreferrer" target="_blank">https://www.jobbank.gc.ca/trend-analysis/search-wages</a></p>
                        </aside>
                    </article>
                    {
                        blogPosts.articles.map(function(article, index){
                            return (
                                <article key={index}>
                                    <h2>{article.title}</h2>
                                    {
                                        article.text.map(function(text, index){
                                            return (
                                                <p>{text}</p>
                                            )
                                        })
                                    }
                                </article>
                            ) 
                        })
                    }
                </section>
            </div>
        );
    }
}


export default Blog;