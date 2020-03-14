import React, { Component } from 'react';

// Custom Components
import CurriculumPage from '../components/pages/curriculum';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Curriculum extends Component{
    render(){
        return (
            <section id="curriculum">
                <ScrollToTopNavigation />
                <CurriculumPage />
            </section>
        );
    }
}

export default Curriculum;