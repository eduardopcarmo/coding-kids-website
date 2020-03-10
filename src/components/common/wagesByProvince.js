// React
import React, { Component } from 'react';

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// JSON FILE
import provinceList from '../../assets/json/province.json';
import topoJsonCanada from '../../assets/json/canadaprov.json';

class WagesByProvince extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors: null,
            isLoaded: false,
            data: []
        };
    }

    // Load Wages Info
    loadWages(province){
        // Load data
        fetch('http://api.codingkids.wmdd.ca/wage/byProvinceAbbreviation?abbreviation=' + province, {
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

    // Load data from API
    componentDidMount(){
        this.loadWages('BC');
    }

    // Wage Graphic
    renderWageGraphic(){
        const {isLoaded, errors, data} = this.state;

        // Is Loading that from API
        if(!isLoaded){
            return <Loading />
        }else if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }else if(Array.isArray(data) && data.length > 0){
            // Show the Sessions
            return (
                <div className="blog__wage__content_graphic">
                    {
                        data.map(function(wage, index){
                            return (
                                <p key={index}>{wage.noc.name} => low: {wage.low} | median: {wage.median} | high: {wage.high} </p>
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
        return (
            <div className="wagesByProvince default_space">
                <section className="blog__wages default_space">
                    <h2>Map with wages by province</h2>
                    <div className="blog__wages__content">
                        <ul>
                            {
                                provinceList.provinces.map(function(province, index){
                                    return (
                                        <li key={index} onClick={() => this.loadWages(province.abbreviation)}>{province.abbreviation} - {province.name}</li>
                                    ) 
                                }, this)
                            }
                        </ul>
                        {this.renderWageGraphic()}
                    </div>
                </section>
            </div>
        )
    }
}

export default WagesByProvince;