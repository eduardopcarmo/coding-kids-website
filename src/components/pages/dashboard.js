// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Authorization
import { getAuthorization } from '../../core/authorization';

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';
import Button from '../common/button';

//CSS
import './dashboard.css'

class Dashboard extends Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            errors: null,
            isLoaded: false,
            items: []
        };

        this.setAsDone = this.setAsDone.bind(this);
    }

    // Load data from API
    componentDidMount(){
        this._isMounted = true;

        // Get the user token
        let user = getAuthorization();
        
        // Load data
        fetch('http://api.codingkids.wmdd.ca/booking/list', {
            method: 'post',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'bearer ' + user.data.token
            })
        }).then(response => {
            if(response.status === 401){
                if (this._isMounted) {
                    this.setState({
                        isLoggedIn: false
                    });
                }
                throw response.statusText;
            }else{
                return response.json();
            }
        })
        .then(result => {
            if(result != null 
                && result.status != null 
                && result.status.id === 200){
                    if (this._isMounted) {
                        this.setState({
                            isLoaded: true,
                            items: result.data
                        });
                    }
            }else {
                if (this._isMounted) {
                    this.setState({
                        isLoaded: true,
                        errors: result.status.errors
                    });
                }
            }
        }).catch(error => {
            if (this._isMounted) {
                this.setState({
                    isLoaded: true,
                    errors: [ error ]
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    // Show Loading
    renderLoading(){
        const { isLoaded } = this.state;
        if(!isLoaded){
            return <Loading />
        }
    }

    // Errors
    renderShowError(){
        const { errors } = this.state;
        // Has error
        return <ErrorFeedback errorsToShow={errors} />
    }

    // Set de booking as done
    setAsDone(e, id){
        // Mark as is Monted
        this._isMounted = true;

        // Get the user token
        let user = getAuthorization();
        
        // Items
        const { items } = this.state;

        // Load data
        fetch('http://api.codingkids.wmdd.ca/booking/markAsDone?id=' + id, {
            method: 'post',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': 'bearer ' + user.data.token
            })
        }).then(response => {
            if(response.status === 401){
                if (this._isMounted) {
                    this.setState({
                        isLoggedIn: false
                    });
                }
                throw response.statusText;
            }else{
                return response.json();
            }
        })
        .then(result => {
            if(result != null 
                && result.status != null 
                && result.status.id === 200){
                    if (this._isMounted) {
                        this.setState ({
                            isLoaded: true,
                            items: items.filter((element) => {
                                return element.id !== id;
                            })
                        });
                    }
            }else {
                if (this._isMounted) {
                    this.setState({
                        isLoaded: true,
                        errors: result.status.errors
                    });
                }
            }
        }).catch(error => {
            if (this._isMounted) {
                this.setState({
                    isLoaded: true,
                    errors: [ error ]
                });
            }
        });
    }

    // Booking List
    renderData(){
        const { items } = this.state;
        if(Array.isArray(items) && items.length > 0){
            return (
                <div className="dashboard__list">
                    {
                        items.map(function(item, index){
                            return (
                                <div className="box dashboard__item" key={item.id}>
                                    <h2 className="box__title box__title-small">{item.email}</h2>
                                    <label>Day of the class</label>
                                    <p>{item.courseClass.name}</p>
                                    <label>Parent's / Caregiver's Name</label>
                                    <p>{item.parentName}</p>
                                    <label>Parent's / Caregiver's Phone Number</label>
                                    <p>{item.parentPhone}</p>
                                    <label>Child's (Children's) Name</label>
                                    <p>{item.childName}</p>
                                    <label>Child's (Children's) Age / Grade</label>
                                    <p>{item.childAge}</p>
                                    <label>Notes (allergies, etc.)</label>
                                    <p>{item.note}</p>
                                    <Button 
                                        classList="btn btn-primary" 
                                        action={(e) => this.setAsDone(e, item.id)}
                                        dataKey={item.id}
                                        text="Mark as Done" />
                                </div>
                            ) 
                        }, this)
                    }
                </div>
            )
        }
    }

    // Render the content
    render(){
        const { isLoggedIn } = this.state;
        if(!isLoggedIn){
            return <Redirect to='/logout' />
        }else{
            return (
            
                <div className="dashboard">
                    <section className="content__session login__form">
                            <h1 className="content__session-title content__session-title-big">Dashboard</h1>
                            <div className="content__login">
                                {this.renderData()}
                                {this.renderShowError()}
                                {this.renderLoading()}
                            </div>
                        </section>
                </div>
            );
        }
    }
}

export default Dashboard;