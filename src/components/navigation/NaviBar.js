import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NaviBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`} target="_self">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="bulabil"
            width="30"
            height="30"
          />
        </a>
        <Link to={`${process.env.PUBLIC_URL}/`} className="navbar-brand">
          Bulabil
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            </li>
            <li className="navbar-item">
              <Link to={`${process.env.PUBLIC_URL}/products`} className="nav-link">
                Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to={`${process.env.PUBLIC_URL}/products/new`} className="nav-link">
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
