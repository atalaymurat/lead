import React from 'react';
import axios from 'axios';

class EditLead extends React.Component {
  state = {
    title: '',
    description: '',
    id: '',
  };

  componentDidMount() {
    axios
      .get(`https://her-app-rails.herokuapp.com/leads/${this.props.lead.id}`)
      .then(res => {
        console.log(res.data.description);
        this.setState({
          title: res.data.title,
          description: res.data.description,
          id: res.data.id,
        });
      });
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const item = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
    };
    axios
      .put(`https://her-app-rails.herokuapp.com/leads/${item.id}`, item)
      .then(res => console.log(res.data))
      .then(this.props.onUpdate(item))
      .then(this.props.handleEditClick());
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
