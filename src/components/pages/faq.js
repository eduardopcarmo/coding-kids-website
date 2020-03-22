// React
import React, { Component } from 'react';

// JSON FILE
import faqQuestions from '../../assets/json/faq.json';

// CSS
import './faq.css';

class Faq extends Component{
    renderQuestions(){
        return (
            <div className="content__session-col content__questions">
                {
                    faqQuestions.questions.map(function(question, index){
                        return (
                            <div className="box" key={index}>
                                <h2 className="box__title box__title-small">{question.title}</h2>
                                <div className="box__text" dangerouslySetInnerHTML={{ __html: question.answer }}></div>
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
            <div className="faq">
                <section className="content__session faq__questions">
                    <h1 className="content__session-title content__session-title-big">FAQ</h1>
                    {this.renderQuestions()}
                </section>
            </div>
        );
    }
}


export default Faq;