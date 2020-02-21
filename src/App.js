// React
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom'

// Header
import Header from './components/common/header';

// Footer
import Footer from './components/common/footer';

// Routes
import Home from './routes/home';
import Curriculum from './routes/curriculum';
import Faq from './routes/faq';
import Blog from './routes/blog';
import Contact from './routes/contact'

// App main CSS (Theme)
import './App.css';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path="/curriculum" component={Curriculum}></Route>
            <Route path="/faq" component={Faq}></Route>
            <Route path="/blog" component={Blog}></Route>
            <Route path="/contact" component={Contact}></Route>
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;
