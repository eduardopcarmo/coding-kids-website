// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Authorization
import { getAuthorization } from '../core/authorization';

// Loading
import Loading from '../components/common/loading';

// Button
import Button from '../components/common/button';

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

    // Check if the user is Logged in
    renderIsLoggedIn(){
        const { isLoggedIn } = this.state;
        if(!isLoggedIn){
            return <Redirect to='/logout' />
        }
    }

    // Errors
    renderShowError(){
        const { errors } = this.state;
        if(Array.isArray(errors) && errors.length > 0){
            return (
                <div className="dashboard__errors">
                    <ul>
                        {
                            errors.map(function(name, index){
                                return <li key={ index }>{name}</li>;
                            })
                        }
                    </ul>
                </div>
            )
        }
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
                <div className="dashboard__table">
                    <table >
                        <thead>
                            <tr>
                                <td>Email address</td>
                                <td>Day of the class</td>
                                <td>Parent's / Caregiver's Name</td>
                                <td>Parent's / Caregiver's Phone Number</td>
                                <td>Child's (Children's) Name</td>
                                <td>Child's (Children's) Age / Grade</td>
                                <td>Notes (allergies, etc.)</td>
                                <td>&nbsp;</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(function(item, index){
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.courseClass.name}</td>
                                            <td>{item.parentName}</td>
                                            <td>{item.parentPhone}</td>
                                            <td>{item.childName}</td>
                                            <td>{item.childAge}</td>
                                            <td>{item.note}</td>
                                            <td>
                                                <Button 
                                                    classList="edu" 
                                                    action={(e) => this.setAsDone(e, item.id)}
                                                    dataKey={item.id}
                                                    text="Mark as Done" />
                                            </td>
                                        </tr>
                                    ) 
                                }, this)
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    
    // Render the content
    render(){
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                {this.renderIsLoggedIn()}
                {this.renderLoading()}
                {this.renderShowError()}
                {this.renderData()}
            </div>
        );
    }
}

export default Dashboard;