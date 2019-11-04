import React from 'react';
import axios from 'axios';

class ProductIndex extends React.Component {
  state = {
    products: [],
  };
  getProducts = () => {
    axios
      .get('http://localhost:3001/products.json')
      .then(response => this.setState({products: response.data}));
  };
  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <div>
        <h1>Product#index</h1>
        <table className="table table-bordered">
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
