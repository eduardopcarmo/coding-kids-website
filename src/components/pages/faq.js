// React
import React, { Component } from 'react';

// Custom Components
import PageTitle from '../common/pageTitle';
import ContactForm from '../common/contactForm';
import Box from '../common/box';

// JSON FILE
import faqQuestions from '../../assets/json/faq.json';

// CSS
import './faq.css';

class Faq extends Component{
    renderQuestions(){
        return (
            <div className="section_1_columns">
                {
                    faqQuestions.questions.map(function(question, index){
                        return (
                            <div key={Date.now().toString() + index}>
                                <Box 
                                    title={question.title}
                                    text={question.answer}/>
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
                <PageTitle title="FAQ" />
                <section className="faq_questions default_space">
                    {this.renderQuestions()}
                </section>
                <ContactForm />
            </div>
        );
    }
}


export default Faq;