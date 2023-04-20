import {
  action,
  autorun,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";

class Counter {
  count;

  constructor(count = 0) {
    this.count = localStorage.getItem("count") || count;

    makeAutoObservable(this);
  }

  increaseCounter = () => {
    this.count++;
  };
}

export const counter = new Counter();

autorun((_) => {
  localStorage.setItem("count", counter.count);
});
