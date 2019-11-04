import React from 'react';
import ImageUpload from '../ImageUpload'

class Form extends React.Component {
  render() {
    return (
      <div>
        <h2>Form Component</h2>
        <form onSubmit={e => this.props.handleSubmit(e)}>
          <div className="form-group">
            <ImageUpload
              handleFileUpload={this.props.handleFileUpload}
            />
          </div>
        <div className="form-group">
          <input 
            name="title"
            type="text" 
            placeholder="Title.."
            className="form-control"
            onChange={this.props.handleChange}
            value={this.props.title}
            id="title"
          />
        </div>
        <div className="form-group">
          <input 
            name="description"
            type="text" 
            placeholder="Description.."
            className="form-control"
            onChange={this.props.handleChange}
            value={this.props.description}
            id="description"
          />
        </div>
        <button 
          className="btn btn-dark">
        Save
        </button>
        </form>
      
      </div>
    )
  }
}
export default Form;
