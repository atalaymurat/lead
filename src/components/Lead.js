import React from 'react';
import Linkify from 'react-linkify';

class Lead extends React.Component {
  handleDelete = () => {
    this.props.onDelete(this.props.lead.id)
  }
  render() {
    return (
      <Linkify properties={{target: '_blank'}}>
      <div className="card mb-2 text-white bg-light border-info" style={{maxWidth: 680}}>
        <div className="card-header text-success border-info">{this.props.lead.title}</div>
        <div className="card-body text-info border-dark">
          <p className="card-text">{this.props.lead.description}</p>
          <p className="card-text"> {this.props.lead.created_at}</p>
          <button 
            className="btn btn-sm btn-info"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      </Linkify>
    );
  }
}

export default Lead;
