import React from 'react';

class NewLeadForm extends React.Component {
  render() {
    return (
      <div className="card text-white bg-warning mb-2" style={{maxWidth: 680}}>
        <div className="card-header">Post a new lead</div>
        <div className="card-body">
          <form onSubmit={e => this.props.handleSubmit(e)}>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-3 col-form-label">
                Title
              </label>
              <div className="col-sm-9">
                <input
                  name="title"
                  onChange={this.props.handleChange}
                  type="text"
                  placeholder="Title ..."
                  id="title"
                  className="form-control"
                  value={this.props.title}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-3 col-form-label">
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  type="text"
                  onChange={this.props.handleChange}
                  name="description"
                  placeholder="Descripe your lead ..."
                  className="form-control"
                  value={this.props.description}
                />
              </div>
            </div>
            <button
              className="btn btn-sm btn-dark"
              disabled={this.props.disabled}>
              {this.props.disabled ? 'Saving..' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default NewLeadForm;
