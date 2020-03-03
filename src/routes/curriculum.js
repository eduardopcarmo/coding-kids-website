import React, { Component } from 'react';

// Custom Components
import CurriculumPage from '../components/pages/curriculum';

class Curriculum extends Component{
    render(){
        return (
            <section id="curriculum">
                <CurriculumPage />
            </section>
        );
    }
}

export default Curriculum;