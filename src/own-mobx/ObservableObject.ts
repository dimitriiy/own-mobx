import { ObservableValue } from './ObservableValue.ts';
import { $$observableAdmin } from './constants.ts';

export function observableObject<T extends object>(target: T): T {
  Object.defineProperty(target, $$observableAdmin, {
    writable: false,
    enumerable: false,
    value: new ObservableObject(target),
  });

  return new Proxy(target, {
    get(...args) {
      return target[$$observableAdmin].get(...args);
    },
    set(...args) {
      return target[$$observableAdmin].set(...args);
    },
  });
}

export class ObservableObject<T extends object> {
  private _target: T;
  private _values: Record<keyof T, ObservableValue<T[keyof T]>>;

  constructor(target: T) {
    this._target = target;

    this._values = Object.fromEntries(
      Object.entries(target).map(([key, value]) => [key, new ObservableValue(value)])
    ) as Record<keyof T, ObservableValue<T[keyof T]>>;
    console.log(this._values);
  }

  get(target: T, key: keyof T) {
    return this._values[key].get();
  }
  set(target: T, key: keyof T, newValue: T[keyof T]) {
    this._values[key].set(newValue);
    return true;
  }
}
