import React, { Component } from 'react';
import './CreatePage.css';
import CreateForm from "./CreateForm";
import { withRouter } from 'react-router-dom';
import Main from '../../services/MainService';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)

        this.state = {
            fields: {}
        };

    }
    onSubmit = fields => {
        var newHandler = this.handler;
        this.setState({ fields });
        Main.addCustomer(fields)
            .then(() => {
                newHandler().history.push('/main');
            })
            .catch((err) => console.log(err));
    }
    handler() {
        return this.props;
    }

    render() {
        return (
            <div>
                <CreateForm onSubmit={fields => this.onSubmit(fields)} />
            </div>
        );
    }
}

export default withRouter(CreatePage);
