import React from 'react';
import Form from './Form';
import axios from 'axios';

class New extends React.Component {
  state = {
    title: '',
    description: '',
    file : ''
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.title, this.state.description);

    const formData = new FormData();
    formData.append('product[images_attributes][0][img]', this.state.file)
    formData.set('product[title]', this.state.title);
    formData.set('product[description]', this.state.description);
    axios({
      method: 'post',
      url: 'http://localhost:3001/products',
      data: formData,
      config: {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    })
      .then(response => console.log('Response of Axios POST', response))
      .catch(errors => console.log(errors));
  };

  handleFileUpload = file => {
    console.log(file)
    this.setState({file: file})
      
  } 

  render() {
    return (
      <div>
        <p>New#Product</p>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFileUpload={this.handleFileUpload}
        />
      </div>
    );
  }
}
export default New;
