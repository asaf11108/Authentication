import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Main from '../../services/MainService';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    Main.getCustomers()
      .then(res => res.json())
      .then(customers => this.setState({ customers }));
  }

  render() {
    const columns = [{
      Header: 'Id',
      accessor: 'id' // String-based value accessors!
    }, {
      Header: 'FirstName',
      accessor: 'firstName' // String-based value accessors!
    }, {
      Header: 'LastName',
      accessor: 'lastName' // String-based value accessors!
    }]
    return (
      <div className="mx-5">
        <div className="row mb-3 mt-5">
          <div className="col">
            <button className="btn btn-primary" onClick={() => this.props.history.push('/create')}>Create customer</button>
          </div>
        </div>
        <ReactTable data={this.state.customers} columns={columns} className="-striped -highlight text-center" defaultPageSize={5} />
      </div>
    );
  }
}


export default withRouter(MainPage);
