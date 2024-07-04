import { $$observable } from './constants.ts';
import { Reaction } from './types.ts';
import { enhancer } from './enhancer.ts';
import { globalState } from './GlobalState.ts';

export class ObservableValue<T> {
  private _observers: Set<Reaction>;
  private _value: T;

  [$$observable]: boolean;

  constructor(value: T) {
    this[$$observable] = true;

    this._observers = new Set();
    this._value = enhancer(value);
  }

  get() {
    if (globalState.trackingDerivation) {
      this.observe(globalState.trackingDerivation);
    }

    return this._value;
  }

  set(value: T) {
    this.notify();
    this._value = enhancer(value);
  }

  private observe(reaction: Reaction) {
    this._observers.add(reaction);
  }
  private notify() {
    this._observers.forEach((cb) => cb());
  }

  dispose(action: Reaction) {
    this._observers.delete(action);
  }
}
