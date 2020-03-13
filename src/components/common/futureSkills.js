// React
import React, { Component } from 'react';

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// CSS
import './futureSkills.css'

class FutureSkills extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors: null,
            isLoaded: false,
            data: []
        };
    }

    // Load data from API
    componentDidMount(){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/futureSkill', {
            method: 'get',
            headers: new Headers({
                'content-type': 'application/json'
            })
        }).then(response => {
            if(response.status !== 200){
                this.setState({
                    isLoaded: true,
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
                        isLoaded: true,
                        data: result.data,
                    });
            }else {
                this.setState({
                    isLoaded: true,
                    errors: result.status.errors
                });
            }
        }).catch(error => {
            this.setState({
                isLoaded: true,
                errors: [ error ]
            });
        });
    }

    renderFutureSkillsGraphic(year){
        // Get values from state
        const {isLoaded, errors, data} = this.state;

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
                                    <div className={index % 3 ? "skill__position" : "skill__position skill__position-green" }>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className="skill__description">
                                        <h4 className="skill__description-title">{skill}</h4>
                                        <p className="skill__description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                    <div className="skill__position skill__position-yellow">
                                        <span>
                                            {data[2015].indexOf(skill) === -1 ? "-" : data[2015].indexOf(skill) + 1 }
                                        </span>
                                    </div>
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

    // Render Component
    render(){
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
}

export default FutureSkills;