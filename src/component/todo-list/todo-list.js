import React from "react";
import TodoListitem from "../todo-list-item/todo-list-item";
import "./todo-list.css";
const TodoList = ({ items, deleteItem, onImportant, onDone }) => {
  const elements = items.map((item) => {
    const { id, ...itemprops } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListitem
          {...itemprops} /*або  label={item.label} important={item.important}*/
          onDeleted={() => deleteItem(id)}
          onImportant={() => onImportant(id)}
          onDone={() => onDone(id)}
        />
      </li>
    );
  });
  return <ul className="group-list-item">{elements}</ul>;
};
export default TodoList;
