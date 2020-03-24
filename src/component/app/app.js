import React, { Component } from "react";
import TodoList from "../todo-list/todo-list";
import FilterPanel from "../filter-panel/filter-panel";
import AddItem from "../add-item/add-item";
import Services from "../services";
import "./app.css";

export default class App extends Component {
  maxid = 10;
  items = new Services();
  state = {
    array: [],
    filter: "all",
  };
  componentDidMount() {
    this.items.getAllItem().then((list) => {
      console.log(list);
      this.setState({
        array: list,
      });
    });
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  };
  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter((item) => !item.done);
    } else if (filter === "done") {
      return items.filter((item) => item.done);
    } else if (filter === "important") {
      return items.filter((item) => item.important);
    }
  }

  //*****************************
  onDone = (id) => {
    const idx = this.state.array.findIndex((el) => el.id === id);
    const oldItem = this.state.array[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    console.log(newItem);
    this.items
      .checkItemImportant(newItem, id)
      .then((res) => res.json())
      .then((res) => {
        this.setState(({ array }) => {
          console.log(res);
          const newArray = [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1),
          ];
          return {
            array: newArray,
          };
        });
      });
  };

  onImportant = (id) => {
    const idx = this.state.array.findIndex((el) => el.id === id);
    const oldItem = this.state.array[idx];
    const newItem = { ...oldItem, important: !oldItem.important };
    console.log(newItem);
    this.items
      .checkItemImportant(newItem, id)
      .then((res) => res.json())
      .then((res) => {
        this.setState(({ array }) => {
          console.log(res);
          const newArray = [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1),
          ];
          return {
            array: newArray,
          };
        });
      });
  };

  deleted = (id) => {
    this.setState(({ array }) => {
      const index = array.findIndex((el) => el.id === id);
      console.log(index);
      // fetch(`http://localhost:3001/posts/${index}`,{
      //     method:"DELETE",
      //     headers:{
      //         'Accept':'application/json',
      //         'Content-Type':'application/json'
      //     }
      // })
      this.items.deleteItem(id);
      array.splice(index, 1);
      return {
        array: array,
      };
    });
  };

  addItems = (text) => {
    console.log(text);
    const newObj = this.newArray(text);
    // console.log(a);
    this.items
      .addNewItem(newObj)
      //  fetch(`http://localhost:3001/posts`,{
      //      method:"POST",
      //      headers:{
      //          'Accept':'application/json',
      //          'Content-Type':'application/json'
      //      },
      //      body:JSON.stringify(newObj)
      //
      //  })
      .then((res) => res.json())

      .then((res) => {
        this.setState(({ array }) => {
          const newArr = [...array, res];
          return { array: newArr };
        });
      });
  };

  newArray(text) {
    return {
      label: text,
      important: false,
      done: false,
    };
  }
  render() {
    const { array, filter } = this.state;
    const visibleItems = this.filterItems(array, filter);

    return (
      <div className="wrap">
        <h1 className="text-center">Todo list</h1>
        <div className="wrap-content">
          <FilterPanel
            className="wrap-filter-panel"
            filter={filter}
            onFilterChange={this.changeFilter}
          />
          <TodoList
            items={visibleItems}
            onImportant={this.onImportant}
            onDone={this.onDone}
            deleteItem={this.deleted}
          />
          <AddItem addItem={this.addItems} />
        </div>
      </div>
    );
  }
}
