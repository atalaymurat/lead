import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import ProductIndex from './components/product/Index';
import LeadList from './components/LeadList';
import ProductNew from './components/product/New';
import ProductEdit from './components/product/Edit';
import NaviBar from './components/navigation/NaviBar';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const Routing = () => (
  <Router history={history}>
    <div className="container">
      <NaviBar />
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
        <Route path={`${process.env.PUBLIC_URL}/leads`} component={LeadList} />
        <Route exact
          path={`${process.env.PUBLIC_URL}/products`}
          component={ProductIndex}
        />
        <Route exact
          path={`${process.env.PUBLIC_URL}/products/new`}
          component={ProductNew}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/products/:id/edit`}
          component={ProductEdit}
        />
      </Switch>
    </div>
  </Router>
);

export default Routing;
