import React from "react";
import './CreatePage.css';

export default class CreateForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            firstName: "",
            lastName: ""
        };
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            firstName: "",
            lastName: "",
        });
    };

    render() {
        return (
            <form className="create-form ml-5">
                <fieldset>
                    <div className="form-group">
                        <label >FirstName</label>
                        <input className="form-control" name="firstName" placeholder="FirstName" value={this.state.firstName} onChange={e => this.change(e)} />
                    </div>
                    <div className="form-group">
                        <label >LastName</label>
                        <input className="form-control" name="lastName" placeholder="LastName" value={this.state.lastName} onChange={e => this.change(e)} />
                    </div>
                    <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>Submit</button>
                </fieldset>
            </form>

        );
    }
}