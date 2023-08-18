export default class EventEmmiter {
    constructor() {
        this.events = {};
      }
    
      on(eventName, callback) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
      }
    
      emit(eventName, ...args) {
        if (this.events[eventName]) {
          this.events[eventName].forEach(callback => {
            callback(...args);
          });
        }
      }
    
      off(eventName, callback) {
        if (this.events[eventName]) {
          this.events[eventName] = this.events[eventName].filter(
            eventCallback => eventCallback !== callback
          );
        }
      }
}