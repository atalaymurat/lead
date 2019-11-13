import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NaviBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/bulabil/build" target="_self">
          <img
            src="/bulabil/build/logo192.png"
            alt="bulabil"
            width="30"
            height="30"
          />
        </a>
        <Link to="/" className="navbar-brand">
          Bulabil
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/product/new" className="nav-link">
                Create Product
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NaviBar;
