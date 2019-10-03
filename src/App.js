import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeadList from './components/LeadList.js';
import axios from 'axios';
import actionCable from 'actioncable';

class App extends React.Component {
  state = {
    leads: [],
    title: '',
    description: '',
    disabled: false,
  };

  createSocket() {
    let cable = actionCable.createConsumer(
      'wss://her-app-rails.herokuapp.com//cable',
    );
    this.socketLead = cable.subscriptions.create(
      {
        channel: 'LineChannel',
      },
      {
        connected: () => {},
        received: data => {
	  console.log(data);

	  if (data.action === "delete") {
	  const leads = this.state.leads.filter(lead => lead.id !== data.id);
	  this.setState({leads: leads});
	  }

	  if (data.action === "create") {
	    this.setState({leads: [data].concat(this.state.leads)});
	  }
	  if (data.action === "update") {
	  console.log(" this will be update block")
	  let index = this.state.leads.findIndex(l => l.id === data.id);
	  let leadsArr = this.state.leads;
	  leadsArr.splice(index, 1, data);
	  this.setState({leads: leadsArr});
	  }
        },
        create: function(leadContent) {
          console.log('New Content : ', leadContent);
          this.perform('create', {
            title: leadContent.title,
            description: leadContent.description,
          });
	},
	delete: function(leadId) {
	  console.log(leadId)
	  this.perform('delete', {id: leadId} )
	},
	update: function(lead) {
	  this.perform('update', {
	    id: lead.id, 
	    title: lead.title,
	    description: lead.description,
	    created_at: lead.created_at
	  });
	}
      },
    );
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.disabled){
    return
    }
    this.setState({disabled: true})

    const lead = {
      title: this.state.title,
      description: this.state.description,
    };

    this.socketLead.create(lead);
    this.setState({title: '', description: ''});

    this.setState({disabled: false})

    //axios
    // .post('/leads', lead)
    //   .then(response => {
    //    this.setState({leads: [response.data].concat(this.state.leads)});
    //   this.setState({title: ' ', description: ' '});
    //  })
    //  .then(this.setState({disabled: false}));
  };

  deleteLead = id => {
    this.socketLead.delete(id)
    //axios
    //.delete(`https://her-app-rails.herokuapp.com/leads/${id}`)
    // .then(res => {
    //    console.log(res)
  };


  updateLead = item => {
    this.socketLead.update(item);
    this.setState({title: '', description: ''});
  };

  getLeads = () => {
    axios
      .get('https://her-app-rails.herokuapp.com/leads')
      .then(response => this.setState({leads: response.data.leads}))
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getLeads();
    this.createSocket();
  }

  render() {
    return (
      <div className="App container">
        <h1>Leads Hot List</h1>
        <LeadList
          leads={this.state.leads}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleEdit={this.handleEdit}
          onUpdate={this.updateLead}
          onDelete={this.deleteLead}
          title={this.state.title}
          description={this.state.description}
          disabled={this.state.disabled}
        />
      </div>
    );
  }
}

export default App;
