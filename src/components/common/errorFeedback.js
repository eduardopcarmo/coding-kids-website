// React
import React, { Component } from 'react';

class ErrorFeedback extends Component{
    render(){
        const errors = this.props.errorsToShow;
        if(Array.isArray(errors) && errors.length > 0){
            return (
                <div className="error__feedback">
                    <ul>
                        {
                            errors.map(function(name, index){
                                return <li key={ index }>{name}</li>;
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return ("");
        }
    }
}

export default ErrorFeedback;