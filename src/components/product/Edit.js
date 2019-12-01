import React from 'react';
import ProductForm from './Form'

class Edit extends React.Component {
  render() {
    return (
      <div>
        <h3>Edit#Product</h3>
        <ProductForm 
          history={this.props.history}
          match={this.props.match}
        />
      </div>
    );
  }
}
export default Edit;
