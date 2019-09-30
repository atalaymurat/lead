import React from 'react';
import Linkify from 'react-linkify';
import EditLead from './EditLead'

class Lead extends React.Component {
  state = {
    edit: false
  };

  handleDelete = () => {
    this.props.onDelete(this.props.lead.id);
  };

  handleEditClick = () => {
    this.setState({edit: !this.state.edit})
  }

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
              onClick={this.handleEditClick}
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
    if (this.state.edit) {
      return (
	<EditLead 
	  lead={this.props.lead}
	  edit={this.state.edit}
	  handleEditClick={this.handleEditClick}
	  onUpdate={this.props.onUpdate}
	/>
      );
    }
  }
}

export default Lead;
