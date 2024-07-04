import { ObservableObject } from './ObservableObject.ts';

export function observable<T>(target: T) {
  return new ObservableObject(target);
}
