import React from 'react';
import axios from 'axios';

class EditLead extends React.Component {
  state = {
    title: '',
    description: '',
    id: '',
    created_at:''
  };

  componentDidMount() {
    axios
      .get(`https://her-app-rails.herokuapp.com/leads/${this.props.lead.id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
	  id: res.data.id,
	  created_at: res.data.created_at
        });
      });
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    const item = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      created_at: this.state.created_at
    };
      this.props.onUpdate(item)
      this.props.handleEditClick();

    event.preventDefault();
  };

  render() {
    return (
      <div className="card text-white bg-warning mb-2" style={{maxWidth: 680}}>
        <div className="card-header">Edit</div>
        <div className="card-body">
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="title">
                Title
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                  name="title"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="description">
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  className="form-control"
                />
              </div>
            </div>
            <button className="btn btn-sm btn-dark mr-2">Update</button>
            <button
              className="btn btn-sm btn-dark"
              onClick={this.props.handleEditClick}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditLead;
