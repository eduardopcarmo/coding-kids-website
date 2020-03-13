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
            // Show the Sessions
            return (
                <div className="wages__table">
                    <h3 className="wages__title">{data[0].province.name}</h3>
                    {
                        data.map(function(wage, index){
                            return (
                                <div className="wages__line" key={index}>
                                    <p className="wages__line-title">{wage.noc.name}</p>
                                    <ul className="wages__line-values">
                                        <li><span>$</span> {wage.low != null ? wage.low.toFixed(2) : "not inf."}</li>
                                        <li><span>$$</span> {wage.median != null ? wage.median.toFixed(2) : "not inf."}</li>
                                        <li><span>$$$</span> {wage.high != null ? wage.high.toFixed(2) : "not inf."}</li>
                                    </ul>
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

    markProvinceAsAcrive(id){
        let element = document.getElementById(id);

        // Remove all classes
        element.parentNode.childNodes.forEach(e => {
            e.classList.remove('path-active');
        });

        // Add Active Class
        element.classList.add('path-active');
    }

    // Create a MAP using D3js
    renderMap(){
        // Setting the inicial values
        const width = this.mapRef.current.offsetWidth; // Get the Width using the Reference
        const height = width *0.75; // width / 2;
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
            .attr("d", path)
            .attr("id", datum => {
                return "path_" + datum.properties.POSTAL;
            })
            .on('click', (datum) => {
                if(datum.properties.POSTAL){
                    this.loadWages(datum.properties.POSTAL);
                    this.markProvinceAsAcrive("path_" + datum.properties.POSTAL);
                }
            }).attr("class", (datum) =>{
                return datum.properties.POSTAL === "BC" ? "path-active" : "";
            })

        // Add the Province Name
        //svg.selectAll(".provinceName")
        //    .data(geojson.features)
        //    .enter().append("svg:text")
        //    .text(function(d){return d.properties.POSTAL;})
        //    .attr("x", function(d){
        //        return path.centroid(d)[0] - 10;
        //    })
        //    .attr("y", function(d){
        //        return path.centroid(d)[1];
        //    });    
    }

    // Render Component
    render(){
        return (
            <div className="content__session blog__posts-wages">
                <div ref={this.mapRef} className="blog__posts-wages-graphic"></div>
                {this.renderWageGraphic()}
            </div>
        )
    }
}

export default WagesByProvince;