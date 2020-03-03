// React
import React, { Component } from 'react';

// Custom Components
import Button from './button';

// CSS
import './box.css';

class Box extends Component{
    renderImg(param){
        if(param != null && param.imgScr){
            return (
                <img src={param.imgScr} className="round-img" alt={param.imgAlt} />
            )
        }else{
            return ("");
        }
    }

    renderTitle(param){
        if(param != null && param.title){
            return (
                <h1 className="small">{param.title}</h1>
            )
        }else{
            return ("");
        }
    }

    renderText(param){
        if(param != null && param.text){
            return (
                <p>{param.text}</p>
            )
        }else{
            return ("");
        }
    }

    renderAction(param){
        if(param != null && param.action){
            return (
                <Button 
                    classList="primary" 
                    action={(e) => param.action}
                    dataKey={Date.now()}
                    text={param.actionText} />
            )
        }else{
            return ("");
        }
    }


    render(){
        return (
            <div className="box">
                <this.renderImg imgScr={this.props.img} imgAlt={this.props.imgAlt} />
                <this.renderTitle title={this.props.title} />
                <this.renderText text={this.props.text} />
                <this.renderAction action={this.props.action} actionText={this.props.actionText}/>
            </div>
        )
    }
}

export default Box;