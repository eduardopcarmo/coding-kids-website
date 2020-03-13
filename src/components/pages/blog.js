// React
import React, { Component } from 'react';

// Custom Components
import WagesByProvince from '../common/wagesByProvince';
import FutureSkills from '../common/futureSkills';

// JSON FILE
import blogPosts from '../../assets/json/blog.json';

// CSS
import './blog.css';

class Blog extends Component{
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
                        <div className="content__session">
                            <p>It is no surprise that more than one-third of skills that are considered important in today’s workforce will change five years from now.</p>
                            <p>The World Economic Forum predicted current trends could lead to a net employment impact of more than 5.1 million jobs lost to disruptive labour market changes over the period 2015-2020, with a total loss of 7.1 million jobs.</p>
                            <p>Two thirds of jobs that could be lost are concentrated in routine white-collar office functions such as office and administrative roles. Meanwhile, there could be a total gain of two million jobs in computer and mathematical and architecture and engineering related fields.</p>
                            <FutureSkills />
                            <aside>
                                <p>Source: World Economic Forum - 5 million jobs to be lost by 2020</p>
                                <p><a href="https://www.weforum.org/agenda/2016/01/5-million-jobs-to-be-lost-by-2020/" rel="noopener noreferrer" target="_blank">https://www.weforum.org/agenda/2016/01/5-million-jobs-to-be-lost-by-2020/</a></p>
                                <p><a href="https://www.humanresourcesonline.net/world-economic-forum-on-the-top-10-skills-and-workforce-strategies-in-2020/" rel="noopener noreferrer" target="_blank">https://www.humanresourcesonline.net/world-economic-forum-on-the-top-10-skills-and-workforce-strategies-in-2020/</a></p>
                            </aside>
                        </div>
                    </article>
                    <article>
                        <h2>Map with wages by province</h2>
                        <div className="content__session">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non pellentesque odio. Suspendisse at rhoncus turpis, eu molestie turpis. Suspendisse sed nisi quis erat mattis rutrum eget cursus quam.</p>
                            <WagesByProvince />
                            <aside>
                                <p>Source: Government of Canada - Job Bank - Trend analysis, Compare wages</p>
                                <p><a href="https://www.jobbank.gc.ca/trend-analysis/search-wages" rel="noopener noreferrer" target="_blank">https://www.jobbank.gc.ca/trend-analysis/search-wages</a></p>
                            </aside>
                        </div>
                    </article>
                    {
                        blogPosts.articles.map(function(article, index){
                            return (
                                <article key={index}>
                                    <h2>{article.title}</h2>
                                    <div className="content__session">
                                        {
                                            article.text.map(function(text, index){
                                                return (
                                                    <p key={index}>{text}</p>
                                                )
                                            })
                                        }
                                    </div>
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