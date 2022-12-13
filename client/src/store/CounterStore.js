import { makeAutoObservable } from 'mobx';

export default class CounterStore {
  constructor() {
    this._counters = []
    makeAutoObservable(this);
  }

  setCounters(counters) {
    this._counters = counters;
  }

  get counters() {
    return this._counters;
  }

}