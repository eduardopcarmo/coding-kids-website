// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Authorization
import { authentication } from '../core/authorization';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: '',
            feedback: '',
            auth: false
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

        // [TODO] ADD LOADING
        this.setState({
            feedback: ["Executing authentication..."]
        });

        // Execut the authentication
        authentication(this.state.user, this.state.pass)
        .then((result) => {
            // User authorized
            if(result != null 
                && result.status != null
                && result.status.id === 200){
                    this.setState({
                        feedback: ['User authorized'],
                        auth: true
                    });
            }else if(result != null 
                    && result.status != null){
                    this.setState({
                        feedback: result.status.errors,
                        auth: false
                    });
            }else{
                this.setState({
                    feedback: ['The username/password specified is not valid'],
                    auth: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                feedback: ['An error occurred, please try again later'],
                auth: false
            });
        });
    }

    renderRedirect(){
        if (this.state.auth) {
            return <Redirect to='/dashboard' />
        }
      }

    renderFeedback(){
        return (
            <div>
                <ul>
                    {       
                        this.state.feedback.map(function(name, index){
                            return <li key={ index }>{name}</li>;
                        })
                    }
                </ul>
            </div>
        )
    }

    render(){
        return (
            <div className="login">
                <h1>Login</h1>
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User:
                        <input type="email" value={this.state.user} onChange={this.handleChangeUser} />
                    </label>
                    <label>
                        Pass:
                        <input type="password" value={this.state.pass}  onChange={this.handleChangePass} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Login;