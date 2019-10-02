import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeadList from './components/LeadList.js';
import axios from 'axios';

class App extends React.Component {
  state = {
    leads: [],
    title: '',
    description: '',
    disabled: false,
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.disabled) {
      return;
    }
    this.setState({disabled: true});
    const lead = {
      title: this.state.title,
      description: this.state.description,
    };

    axios
      .post('https://her-app-rails.herokuapp.com/leads', lead)
      .then(response => {
        this.setState({leads: [response.data].concat(this.state.leads)});
        this.setState({title: ' ', description: ' '});
      })
      .then(this.setState({disabled: false}));
  };

  deleteLead = id => {
    axios
      .delete(`https://her-app-rails.herokuapp.com/leads/${id}`)
      .then(res => {
        const leads = this.state.leads.filter(lead => lead.id !== id);
        this.setState({leads: leads});
      });
  };

  updateLead = item => {

	let index = this.state.leads.findIndex(l => (l.id === item.id) )
	let leadsArr = this.state.leads
	leadsArr.splice(index, 1, item) 
        this.setState( {leads: leadsArr} ) 
        this.setState({title:'', description:''})
  };

  getLeads = () => {
    axios
      .get('https://her-app-rails.herokuapp.com/leads')
      .then(response => this.setState({leads: response.data.leads}))
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getLeads();
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
