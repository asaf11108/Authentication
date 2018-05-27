import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Main from '../../services/MainService';
import Redux from '../../Redux';

import { connect } from "react-redux"
import { increment, decrement } from '../../actions/CounterActions'

const mapStateToProps = (state) => {
  console.log()
  counters: state.counterReducer
}

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

  handleClick() {
    let { dispatch } = this.props;
    dispatch(increment())
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
        <button onClick={() => this.handleClick()}>INCREASE</button>
        <p>{this.props.counters}</p>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(MainPage));
