// Polyfill for nodelist support on IE
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
export function nodelist() {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, argument) {
      argument = argument || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(argument, this[i], i, this);
      }
    };
  }
}
