import React from 'react';
import Lead from './Lead';
import NewLeadForm from './NewLeadForm';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class LeadList extends React.Component {
  state = {
    edit: false
  };

  handleDisable = () => {
    this.setState({edit: !this.state.edit})
  }

  render() {
    return (
      <div>
        <NewLeadForm
          handleSubmit={this.props.handleSubmit}
          handleChange={this.props.handleChange}
          title={this.props.title}
          description={this.props.description}
          disabled={this.props.disabled}
        />
        {this.props.leads.length === 0 ? (
          <div className="text-center"
            style={{maxWidth: 680}}
          >
          <Loader 
            type="Triangle" 
            color="orange" 
            height={150} 
            width={150}
          />
          </div>
        ) : (
          this.props.leads.map((lead, i) => {
            return (
              <div 
                key={i}
              >
                <Lead 
                  lead={lead} 
                  onDelete={this.props.onDelete}
                  handleChange={this.props.handleChange}
                  onUpdate={this.props.onUpdate}
                  handleEdit={this.props.handleEdit}
                  edit={this.state.edit}
                  handleDisable={this.handleDisable}
                />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default LeadList;
