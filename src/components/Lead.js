import React from 'react';
import Linkify from 'react-linkify';

class Lead extends React.Component {
  state = {
    edit: false,
    title: '',
    description: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleDelete = () => {
    this.props.onDelete(this.props.lead.id);
  };

  handleEdit = () => {
    let item = {
      id: this.props.lead.id,
      title: this.state.title === '' ? this.props.lead.title : this.state.title,
      description: this.state.description === '' ? this.props.lead.description : this.state.description,
    };
    this.props.onUpdate(item);
    this.props.handleDisable();
    this.setState( { edit: !this.state.edit})
  };

  render() {
    if (!this.state.edit) {
      return (
        <div
          className="card mb-2 text-white bg-light border-info"
          style={{maxWidth: 680}}>
          <div className="card-header text-dark border-info">
            {this.props.lead.title}
          </div>
          <div className="card-body text-info border-dark">
            <Linkify properties={{target: '_blank'}}>
              <pre className="card-text">{this.props.lead.description}</pre>
            </Linkify>
            <p className="card-text">{this.props.lead.created_at}</p>

            <button className="btn btn-sm btn-info" onClick={this.handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-sm btn-info ml-2"
              onClick={this.handleEdit}
              disabled={this.props.edit}
            >
              {this.state.edit ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      );
    }
    if (this.state.edit) {
      return (
        <div
          className="card text-white bg-warning mb-2"
          style={{maxWidth: 680}}>
          <div className="card-header">Edit</div>
          <div className="card-body">
            <form 
              onSubmit={e => this.handleEdit(e)}>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="title">
                  Title
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                    defaultValue={this.props.lead.title}
                    name="title"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="description">
                  Description
                </label>
                <div className="col-sm-9">
                  <textarea
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    defaultValue={this.props.lead.description}
                    className="form-control"
                  />
                </div>
              </div>
              <button 
                className="btn btn-sm btn-dark" 
              >
                Save
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Lead;
