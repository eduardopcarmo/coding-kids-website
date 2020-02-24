// React
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'

// Authorization
import { getAuthorization } from './core/authorization';

// Header
import Header from './components/common/header';

// Footer
import Footer from './components/common/footer';

// Routes
import Home from './routes/home';
import Curriculum from './routes/curriculum';
import Faq from './routes/faq';
import Blog from './routes/blog';
import Contact from './routes/contact';
import Login from './routes/login';
import Dashboard from './routes/dashboard';
import Logout from './routes/logout';

// App main CSS (Theme)
import './App.css';

// Implement a Logic to use as private route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getAuthorization() != null && getAuthorization().status.id === 200
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

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
            <Route path="/login" component={Login}></Route>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
            <PrivateRoute path="/logout" component={Logout}></PrivateRoute>
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;
