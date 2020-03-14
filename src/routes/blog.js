import React, { Component } from 'react';

// Custom Components
import BlogPage from '../components/pages/blog';
import ScrollToTopNavigation from '../components/common/scrollToTopNavigation';

class Blog extends Component{
    render(){
        return (
            <section id="blog">
                <ScrollToTopNavigation />
                <BlogPage />
            </section>
        );
    }
}

export default Blog;