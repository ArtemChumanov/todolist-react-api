import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListitem extends Component {
  render() {
    const {
      done,
      important,
      label,
      onDeleted,
      onImportant,
      onDone,
    } = this.props;
    //const {}=this.state;
    const style = {
      color: important ? "red" : "black",
    };

    let className = "";
    if (done) {
      className += "line-throw";
    }
    let className2 = "fa fa-circle-thin co fa-2x";
    if (important) {
      className2 = "";
      className2 += "fa fa-check-circle co fa-2x";
    }
    return (
      <div className="list">
        <button className="btn" onClick={onImportant}>
          <i className={className2}></i>
        </button>
        <span className={className} style={style} onClick={onDone}>
          {label}
        </span>
        <div className="important-buttons">
          <button className="btn" onClick={onDeleted}>
            <i className="fa fa-trash-o de fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}
