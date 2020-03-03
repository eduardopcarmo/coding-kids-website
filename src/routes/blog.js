import React, { Component } from 'react';

// Custom Components
import BlogPage from '../components/pages/blog';

class Blog extends Component{
    render(){
        return (
            <section id="blog">
                <BlogPage />
            </section>
        );
    }
}

export default Blog;