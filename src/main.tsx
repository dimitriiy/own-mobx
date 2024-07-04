import { autorun } from './own-mobx';
import { observableObject } from './own-mobx/ObservableObject.ts';

// 1. ObservableValue
// 2. Reaction

const counter = observableObject({ count: 0 });

console.log('counter', counter.count);

function listener() {
  console.log(counter.count); //вывод в консоль 1…2…3…4…5…6
}

autorun(listener);

function increment() {
  counter.count++;
}

setInterval(increment, 500);
