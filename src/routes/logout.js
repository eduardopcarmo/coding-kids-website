// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Authorization
import { logout } from '../core/authorization';

class Logout extends Component{
    render(){
        logout();
        return <Redirect to='/login' />
    }
}

export default Logout;