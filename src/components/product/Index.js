import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class ProductIndex extends React.Component {
  state = {
    products: [],
  };
  getProducts = () => {
    axios
      //.get('http://localhost:3001/products.json')
      .get('https://her-app-rails.herokuapp.com/products.json')
      .then(response => this.setState({products: response.data}));
  };

  handleNewProduct = (newProduct) => {
    console.log(newProduct)
  }
  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <div>
        <h3>Product#index</h3>
        <Link to={{pathname: 'product/new'
           }} className="btn btn-primary">
          New Product</Link>
        <table className="table-responsive table-sm">
          <thead>
            <tr>
              <th>image</th>
              <th>title</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img src={product.images[0].img.thumb.url} />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ProductIndex;
