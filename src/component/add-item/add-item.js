import React, { Component } from "react";
import "./add-item.css";
export default class AddItem extends Component {
  state = {
    label: "",
  };

  textItem = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label == "") {
      return;
    } else {
      this.props.addItem(this.state.label);
      this.setState({ label: "" });
    }
  };
  render() {
    return (
      <form className="d-flex flex-row">
        <input
          type="text"
          className="form-control "
          onChange={this.textItem}
          onSubmit={this.onSubmit}
          value={this.state.label}
        />
        <button className="btn btn-add" onClick={this.onSubmit}>
          <i className="fa fa-plus-circle co circle-btn"></i>
        </button>
      </form>
    );
  }
}
