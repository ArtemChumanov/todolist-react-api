export default class Services {
  async getResourse(url) {
    const res = await fetch(`http://localhost:3001/${url}`, {});
    return await res.json();
  }
  getAllItem = async () => {
    const res = await this.getResourse(`posts`);
    return res.map(this.transformItem).slice(0, 5);
  };
  transformItem = (item) => {
    return {
      id: item.id,
      label: item.label,
      important: item.important,
      done: item.done,
    };
  };
  ///==========================
  addNewItem = async (data) => {
    return await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  checkItemImportant = async (data, index) => {
    return fetch(`http://localhost:3001/posts/${index}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  checkItemDone = async (data, index) => {
    return fetch(`http://localhost:3001/posts/${index}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  deleteItem = async (idx) => {
    fetch(`http://localhost:3001/posts/${idx}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
}
