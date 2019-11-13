import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import ProductIndex from './components/product/Index';
import ProductNew from './components/product/New';
import NaviBar from './components/navigation/NaviBar';

class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NaviBar />

          <Route basename="/bulabil/build" path="/" exact component={App} />
          <Route path="/products" component={ProductIndex} />
          <Route path="/product/new" component={ProductNew} />
        </div>
      </Router>
    );
  }
}
export default Routing;
