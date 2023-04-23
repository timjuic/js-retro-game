export default class EventEmmiter {
    constructor() {
        this.events = {};
      }
    
      on(eventName, callback) {
        // Register a callback for an event
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
      }
    
      emit(eventName, ...args) {
        // Emit an event and call all registered callbacks
        if (this.events[eventName]) {
          this.events[eventName].forEach(callback => {
            callback(...args);
          });
        }
      }
    
      off(eventName, callback) {
        // Remove a registered callback for an event
        if (this.events[eventName]) {
          this.events[eventName] = this.events[eventName].filter(
            eventCallback => eventCallback !== callback
          );
        }
      }
}