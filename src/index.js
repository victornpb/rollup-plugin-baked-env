import sum from './utils/sum';

export default class FooBar {
  str = 'Hello World';
  #p = 1;
  constructor() {
    console.log('FooBar' + this.str + this.#p);
  }
  sum(a, b) {
    return sum(a, b);
  }
  #bar() {
    return 123;
  }
}