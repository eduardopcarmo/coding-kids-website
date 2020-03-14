// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Custom Components
import Loading from '../common/loading';
import ErrorFeedback from '../common/errorFeedback';

// Authorization
import { authentication } from '../../core/authorization';

// CSS
import './login.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: '',
            auth: false,
            errors: null,
            isLoaded: true,
        };

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUser(event){
        this.setState({ user: event.target.value} );
    }

    handleChangePass(event){
        this.setState({ pass: event.target.value} );
    }

    handleSubmit(event){
        event.preventDefault();

        // Se as is Loading
        this.setState({
            isLoaded: false
        });

        // Execut the authentication
        authentication(this.state.user, this.state.pass)
        .then((result) => {
            // User authorized
            if(result != null 
                && result.status != null
                && result.status.id === 200){
                    this.setState({
                        isLoaded: true,
                        auth: true
                    });
            }else if(result != null 
                    && result.status != null){
                    this.setState({
                        isLoaded: true,
                        errors: result.status.errors,
                        auth: false
                    });
            }else{
                this.setState({
                    isLoaded: true,
                    errors: ['The username/password specified is not valid'],
                    auth: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                isLoaded: true,
                errors: ['An error occurred, please try again later'],
                auth: false
            });
        });
    }

    // Render "Error Feedback"
    renderErrorFeedback(){
        const {errors} = this.state;
        if(Array.isArray(errors) && errors.length > 0){
            // Has error
            return <ErrorFeedback errorsToShow={errors} />
        }
        else{
            return null;
        }
    }

    // Render "Loading"
    renderLoading(){
        const {isLoaded} = this.state;
        if(!isLoaded){
            return <Loading />
        }else{
            return null;
        }
    }

    // Render the Login Form
    render(){
        const {isLoaded, auth} = this.state;

        // User is authorize
        if(auth){
            // User is authorize
            return <Redirect to='/dashboard' />
        }else{
            return (
                <div className="login">
                    <section className="content__session login__form">
                        <h1 className="content__session-title content__session-title-big">Login</h1>
                        <div className="content__session-col content__login">
                            <form className="form__horizontal form__horizontal-inverse" onSubmit={this.handleSubmit}>
                                {this.renderErrorFeedback()}
                                <label>User</label>
                                <input type="email" value={this.state.user} onChange={this.handleChangeUser} disabled={!isLoaded} required/>
                                <label>Password</label>
                                <input type="password" value={this.state.pass}  onChange={this.handleChangePass} disabled={!isLoaded} required/>
                                {this.renderLoading()}
                                <button type="submit" className="btn btn-primary" disabled={!isLoaded}>Log in</button>
                            </form>
                        </div>
                    </section>
                </div>
            );
        }

    }
}

export default Login;