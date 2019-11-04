import React, {Component} from 'react';

class ImageUpload extends Component {
  state = {
    file: '',
    imagePreviewUrl: '',
  };

  _handleSubmit = e => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  };

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result});
    };
    reader.readAsDataURL(file);
    this.props.handleFileUpload(file)
  };

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    return (
      <div className="form-group">
          <input type="file" onChange={this._handleImageChange} />
          <button onClick={this.props.handleFileUpload}>
            Upload
          </button>
        {!$imagePreview && <img src={imagePreviewUrl} />}
      </div>
    );
  }
}

export default ImageUpload;
