// React
import React, { Component } from 'react';

// D3.js
import * as d3 from 'd3';
import * as topojson from "topojson-client";

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// JSON FILE
import topoJsonCanada from '../../assets/json/canada-topojson.json';

// CSS
import './wagesByProvince.css'


class WagesByProvince extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors: null,
            isLoaded: false,
            data: []
        };

        // Get the reference for the map
        this.mapRef = React.createRef();
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
        this.renderMap();
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

            console.log(data[0].province.name)
            // Show the Sessions
            return (
                <div className="blog__wage__content_graphic">
                    <h3>{data[0].province.name}</h3>
                    {
                        data.map(function(wage, index){
                            console.log(wage);
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

    // Create a MAP using D3js
    renderMap(){
        // Setting the inicial values
        const width = this.mapRef.current.offsetWidth; // Get the Width using the Reference
        const height = width; // width / 2;
        const mapRatio = 1;
        const mapRatioAdjuster = .15;

        // Use the Reference to append the SVG
        const svg = d3.select(this.mapRef.current).append("svg")
            .attr("width", width)
            .attr("height", height);
        
        // Define how the map will be displayed
        const projection = d3.geoAzimuthalEqualArea()
                                .rotate([100, -45])
                                .center([5, 18])
                                .translate([width / 2, height / 2])
                                .scale(width * [mapRatio + mapRatioAdjuster]);

        // Create the PATH using the projection
        const path = d3.geoPath().projection(projection);

        // Convert the TOPOJSON file to GEOJON Object
        const geojson = topojson.feature(topoJsonCanada, topoJsonCanada.objects.canada);

        // Add the values to create the map inside de SVG
        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            //.attr("id", function(d,i) { return "province_"+i; }) //Unique id for each Province
            .attr("d", path)
            .on('click', datum => {
                if(datum.properties.POSTAL){
                    this.loadWages(datum.properties.POSTAL)
                    console.log(datum.properties.POSTAL); // the datum for the clicked circle
                }
            }).style("fill", datum =>{
                //return datum.properties.POSTAL === "BC" ? "yellow" : null;
            })

        // Add the Province Name
        svg.selectAll(".provinceName")
            .data(geojson.features)
            .enter().append("svg:text")
            .text(function(d){return d.properties.POSTAL;})
            .attr("x", function(d){
                return path.centroid(d)[0] - 10;
            })
            .attr("y", function(d){
                return path.centroid(d)[1];
            });    
    }

    // Render Component
    render(){
        return (
            <div className="wagesByProvince default_space">
                <section className="blog__wages default_space">
                    <h2>Map with wages by province</h2>
                    <div ref={this.mapRef}></div>
                    <div className="blog__wages__content">
                        {this.renderWageGraphic()}
                    </div>
                </section>
            </div>
        )
    }
}

export default WagesByProvince;