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
    this.props.handleFileUpload(file);
  };

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    return (
      <div>
        <div className="custom-file mb-2">
          <input
            type="file"
            id="customFile"
            className="custom-file-input"
            onChange={this._handleImageChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Select your file...
          </label>
        </div>
        <div className="row">
          <div className="col">
            {!$imagePreview && <img src={imagePreviewUrl} height={100} />}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
