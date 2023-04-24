import { action, autorun, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { user } from "./User";
import { notification } from "antd";

const initialItem = {
  name: "",
  description: "",
  category: "",
  price: "",
  rating: 0,
  user: "",
};

export default class Item {
  // @observable
  items = [];

  constructor() {
    this.items = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    makeObservable(this, {
      items: observable.ref,
      addItem: action.bound,
      updateItem: action.bound,
      deleteItem: action.bound,
    });
  }

  // @action
  addItem = (payload) => {
    const itemObj = {
      ...initialItem,
      ...payload,
      id: uuidv4(),
      user: user.profile.id,
      createdAt: new Date().getTime(),
    };
    this.items = [...this.items, { ...itemObj }];
    notification.open({
      message: "Item added successfully.",
      type: "success",
    });
    return {
      data: itemObj,
      error: null,
    };
  };

  // @action
  updateItem = (payload) => {
    this.items = [
      ...this.items.map((i) =>
        i.id === payload.id ? { ...i, ...payload } : i
      ),
    ];
    notification.open({
      message: "Item updated successfully.",
      type: "success",
    });
  };

  // @action
  deleteItem = (id) => {
    this.items = [...this.items.filter((i) => i.id !== id)];
    notification.open({
      message: "Item deleted successfully.",
      type: "success",
    });
  };
}

export const item = new Item();

// autorun
autorun((_) => {
  item.items.length;
  localStorage.setItem("items", JSON.stringify(item.items));
});
