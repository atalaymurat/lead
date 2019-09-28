import React from "react";
import Lead from "./Lead";
import NewLeadForm from "./NewLeadForm";

class LeadList extends React.Component {

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

      { this.props.leads.map((lead, i) => {
        return (
          <div  
            key={i}>
            <Lead 
              lead={lead}
              onDelete={this.props.onDelete}
            />
          </div>
        ) 
      })}
      </div>
    )
  }
}

export default LeadList;
