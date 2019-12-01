import React from 'react';
import ProductForm from './Form';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class New extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ saving: true})
    console.log(this.state.title, this.state.description);

    const formData = new FormData();
    formData.append('product[images_attributes][0][img]', this.state.file);
    formData.set('product[title]', this.state.title);
    formData.set('product[description]', this.state.description);
    axios({
      method: 'post',
      url: 'http://localhost:3001/products',
      //url: 'https://her-app-rails.herokuapp.com/products',
      data: formData,
      config: {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    })
      .then(function(response) { console.log('Response of Axios POST', response)})
    
      .catch(errors => console.log(errors));
    this.props.history.push('/products')
    this.setState({ saving: false})
  };

  render() {
    return (
      <div>
        <p>New#Product</p>
        <ProductForm
          history={this.props.history}
          match={this.props.match}
        />
      </div>

    );
  }
}
export default withRouter(New);
