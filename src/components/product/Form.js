import React from 'react';
import ImageUpload from '../ImageUpload';
import axiosClient from '../axiosClient';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.emptyImage = {
      file: '',
      id: null,
      errors: {},
      _destroy: false,
    };

    this.state = {
      product: {
        title: '',
        description: '',
        errors: {},
        images_attributes: [Object.assign({}, this.emptyImage)]
      },
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axiosClient
        .get(`/products/${this.props.match.params.id}.json`)
        .then(response => {
          this.setState({product: response.data});
        });
    }
  }

  handleTitleChange = e => {
    let product = this.state.product;
    product.title = e.target.value;
    this.setState({product: this.state.product});
  };
  handleDescriptionChange = e => {
    let product = this.state.product;
    product.description = e.target.value;
    this.setState({product: this.state.product});
  };

  handleFormSubmit = () => {
    let submitMethod = this.state.product.id ? 'patch' : 'post';
    let url = this.state.product.id
      ? `/products/${this.state.product.id}.json`
      : '/products.json';

    axiosClient[submitMethod](url, {
      product: this.state.product,
    })
      .then(response => {
        this.props.history.push('/products');
      })
      .catch(error => {
        this.setState({product: error.response.data}, () => {
          console.log(this.state.product);
        });
      });
  };

  handleAddImage = () => {
    this.state.product.image_attributes.push(Object.assign({}, this.emptyImage));
    this.setState({ product: this.state.product })
  }
  
  handleFileUpload = (file, image)=> {
    image.file = file
    this.setState({ product: this.state.product})
    console.log(this.state.product)
  }

  render() {
    return (
      <div>
        <h2>Form Component</h2>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <div className="form-group">
            <ImageUpload 
              handleFileUpload={this.handleFileUpload} />
            <button
              className="btn btn-success btn-sm"
              onClick={e => this.handleAddImage}
            >Add Image</button>
          </div>
          <div className="form-group">
            <input
              name="title"
              type="text"
              placeholder="Title.."
              className="form-control"
              onChange={this.handleTitleChange}
              value={this.state.product.title}
              id="title"
            />
          </div>
          <div className="form-group">
            <input
              name="description"
              type="text"
              placeholder="Description.."
              className="form-control"
              onChange={this.handleDescriptionChange}
              value={this.state.product.description}
              id="description"
            />
          </div>
          <button className="btn btn-dark">Save</button>
        </form>
      </div>
    );
  }
}

export default Form;
