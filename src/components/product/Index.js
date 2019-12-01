import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axiosClient from '../axiosClient'

class ProductIndex extends React.Component {
  state = {
    products: [],
  };
  getProducts = () => {
    axiosClient
      .get('/products.json')
      .then(response => this.setState({products: response.data}));
  };

  componentDidMount() {
    this.getProducts();
  }

  renderTable() {
    return this.state.products.map((product, i) => {
      return (
        <tr key={product.id}>
          <td>
            <img
              src={product.images.length > 0 ? product.images[0].img.thumb.url : ''}
            />
          </td>
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>
            <button
              onClick={e => this.handleEdit(product.id)}
              className="btn btn-primary btn-sm mr-2"
            >Edit</button>
            <button
              onClick={e => this.handleRemove(product.id)}
              className="btn btn-danger btn-sm"
            >Delete</button>
          </td>
        </tr>
      );
    });
  }

  handleNewProduct = () => {
    this.props.history.push('/products/new');
  };

  handleEdit = productId => {
    this.props.history.push(`/products/${productId}/edit`);
  };

  handleRemove = productId => {
    let products = this.state.products;
    products = products.filter(product => {
      return product.id !== productId;
    });
    this.setState({products: products});
    axiosClient.delete(`/products/${productId}`);
  };

  render() {
    return (
      <div>
        <h3>Product#index</h3>
        <button
          onClick={e => this.handleNewProduct()}
          className="btn btn-success"
        >
        Create Product
        </button>
        {this.state.products.length === 0 ? (
          <div className="text-center">
            <Loader type="ThreeDots" color="orange" height={150} width={150} />
          </div>
        ) : (
          <table className="table-responsive table-sm">
            <thead>
              <tr>
                <th>image</th>
                <th>title</th>
                <th>description</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>{this.renderTable()}</tbody>
          </table>
        )}
      </div>
    );
  }
}
export default ProductIndex;
